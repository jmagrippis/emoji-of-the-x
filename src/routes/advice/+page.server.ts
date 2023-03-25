import {error, fail} from '@sveltejs/kit'

import type {Actions, PageServerLoad} from './$types'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'
import {createChatCompletion} from '$lib/server/openaiClient'

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
					'You need to provide all the emoji of the day, a character and the type of content you want their advice on',
			})
		}

		const [adviceResult, characterResult, emojiResult, contentTypeResult] = await Promise.all([
			locals.supabase
				.from('advice')
				.select('content')
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

		const shortQuestion = `${character.name}, how you would you make a ${contentType} with a theme of "${emoji.character}?`

		if (adviceResult.data) {
			return {
				success: true,
				question: shortQuestion,
				answer: adviceResult.data.content,
			}
		}

		const answer = await createChatCompletion([
			{role: 'system', content: `You are ${character.name} from ${character.franchise}.`},
			{
				role: 'user',
				content: `The emoji of the day is ‘${emoji.character}’! How you would you make a ${contentType} with a theme of ‘${emoji.character}’"?`,
			},
		])

		if (!answer) {
			return fail(500, {emojiCode, error: `Could not get ${character.name} to speak!`})
		}

		await supabaseServiceClient.from('advice').insert({
			emoji_code: emojiCode,
			character_id: characterId,
			type: contentType,
			content: answer,
		})

		return {
			success: true,
			question: shortQuestion,
			answer,
		}
	},
} satisfies Actions
