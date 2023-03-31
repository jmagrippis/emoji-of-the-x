import {error, fail} from '@sveltejs/kit'

import type {Actions, PageServerLoad} from './$types'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'
import {createChatCompletion, generateImage} from '$lib/server/openaiClient'

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

export const load = (async ({locals}) => {
	const [charactersResult, emojiResult, contentTypesResult] = await Promise.all([
		locals.supabase.from('characters').select('id, name, title'),
		locals.supabase
			.from('picks')
			.select('emojis(code, character)')
			.limit(1)
			.order('created_at', {ascending: false})
			.single(),
		locals.supabase.from('content_types').select('id'),
	])

	if (charactersResult.error) {
		throw error(500, {
			message: `Unable to load available characters: ${charactersResult.error.message}`,
		})
	}

	if (emojiResult.error || !emojiResult.data.emojis) {
		throw error(500, {
			message: `Unable to load the emoji of the day: ${
				emojiResult.error?.message ?? 'no emoji data'
			}`,
		})
	}

	if (contentTypesResult.error) {
		throw error(500, {
			message: `Unable to load available characters: ${contentTypesResult.error.message}`,
		})
	}

	const emoji = Array.isArray(emojiResult.data.emojis)
		? emojiResult.data.emojis[0]
		: emojiResult.data.emojis

	return {
		characters: charactersResult.data,
		emoji,
		contentTypes: contentTypesResult.data.map(({id}) => id),
		meta: {
			title: `How would X make content about ${emoji.character}?`,
		},
	}
}) satisfies PageServerLoad

const getArtRelativePath = (id: string) => `art/${id}.png`

export const actions = {
	default: async ({request, locals}) => {
		const data = await request.formData()
		const emojiCode = data.get('emoji_code')
		const characterId = data.get('character_id')
		const contentType = data.get('content_type')

		if (
			typeof emojiCode !== 'string' ||
			typeof characterId !== 'string' ||
			typeof contentType !== 'string'
		) {
			return fail(400, {
				error:
					'You need to provide all of the emoji of the day, a character, and the type of content you want their advice on',
			})
		}

		const [adviceResult, characterResult, emojiResult, contentTypeResult] = await Promise.all([
			locals.supabase
				.from('advice')
				.select('id, content, art_prompt')
				.eq('emoji_code', emojiCode)
				.eq('character_id', characterId)
				.eq('type', contentType)
				.limit(1)
				.maybeSingle(),
			locals.supabase
				.from('characters')
				.select('name, franchise')
				.limit(1)
				.eq('id', characterId)
				.single(),
			locals.supabase.from('emojis').select('character').eq('code', emojiCode).single(),
			locals.supabase.from('content_types').select().limit(1).eq('id', contentType).single(),
		])

		if (characterResult.error) {
			return fail(400, {error: `Unable to find character with id ${characterId}`})
		}

		if (emojiResult.error) {
			return fail(400, {error: `Unable to find emoji with id ${emojiCode}`})
		}

		if (contentTypeResult.error) {
			return fail(400, {error: `${contentType} is not a valid type of content`})
		}

		const character = characterResult.data
		const emoji = emojiResult.data

		const shortQuestion = `${character.name}, how you would you make a ${contentType} with a theme of ‘${emoji.character}’?`

		let art: {src: string; title: string} | null = null

		if (adviceResult.data) {
			if (adviceResult.data.art_prompt) {
				const {data} = locals.supabase.storage
					.from('advice')
					.getPublicUrl(getArtRelativePath(adviceResult.data.id))
				art = {
					src: data.publicUrl,
					title: adviceResult.data.art_prompt,
				}
			}

			return {
				success: true,
				question: shortQuestion,
				answer: adviceResult.data.content,
				art,
			}
		}
		const artPrompt = `Sketch by ${character.name} from ${character.franchise} for a ${contentType} with a theme of ‘${emoji.character}’`
		const [answer, generatedImageUrl] = await Promise.all([
			createChatCompletion([
				{
					role: 'system',
					content: `You are ${character.name} from ${character.franchise}. Please only respond as ${character.name}`,
				},
				{
					role: 'user',
					content: `The emoji of the day is ‘${emoji.character}’! How you would you make a ${contentType} with a theme of ‘${emoji.character}’"?`,
				},
			]),
			generateImage(artPrompt),
		])

		if (!answer) {
			return fail(500, {emojiCode, error: `Could not get ${character.name} to speak!`})
		}

		const insertAdviceResult = await supabaseServiceClient
			.from('advice')
			.insert({
				emoji_code: emojiCode,
				character_id: characterId,
				type: contentType,
				content: answer,
				art_prompt: artPrompt,
			})
			.select('id')
			.single()

		if (generatedImageUrl && !insertAdviceResult.error) {
			const imageResponse = await fetch(generatedImageUrl)
			const blob = await imageResponse.blob()
			const path = getArtRelativePath(insertAdviceResult.data.id)
			const uploadImageResult = await supabaseServiceClient.storage
				.from('advice')
				.upload(path, blob, {
					cacheControl: `${ONE_WEEK_IN_SECONDS}`,
				})

			const {
				data: {publicUrl: src},
			} = locals.supabase.storage.from('advice').getPublicUrl(path)

			if (!uploadImageResult.error) {
				art = {
					src,
					title: artPrompt,
				}
			}
		}

		return {
			success: true,
			question: shortQuestion,
			answer,
			art,
		}
	},
} satisfies Actions
