import {fail, error, type Actions} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'
import {isValidTheme} from '../hooks.server'
import {createChatCompletion} from '$lib/server/openaiClient'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'
import {getRelativeAnchor} from '$lib/getRelativeAnchor'

const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60

export const load = (async ({locals, url}) => {
	const pickResult = await locals.supabase
		.from('picks')
		.select(
			`
			id,
			created_at,
			emojis(
				code,
				character,
				name,
				quotes (
					content,
					characters (
						id,
						name,
						title
					)
				)
			)
	`
		)
		.limit(1)
		.order('created_at', {ascending: false})
		.single()

	if (pickResult.error) {
		throw pickResult.error
	}
	const pick = pickResult.data
	const emoji = Array.isArray(pick.emojis) ? pick.emojis[0] : pick.emojis
	if (!pick || !emoji) {
		throw error(404, {message: 'could not find an emoji for today!'})
	}
	const dbQuotes = emoji.quotes ? (Array.isArray(emoji.quotes) ? emoji.quotes : [emoji.quotes]) : []

	const quotedCharacterIds = dbQuotes.reduce<Record<string, string>>((acc, {characters}) => {
		if (!characters) return acc
		if (Array.isArray(characters)) {
			characters.forEach(({id}) => {
				acc[id] = id
			})
		} else {
			acc[characters.id] = characters.id
		}
		return acc
	}, {})

	const charactersResult = await locals.supabase
		.from('characters')
		.select('id, name, title')
		.not('id', 'in', `(${Object.keys(quotedCharacterIds).join(',')})})`)

	const previousPickDateObject = new Date(pick.created_at)
	previousPickDateObject.setDate(previousPickDateObject.getDate() - 1)
	const previousPick = getRelativeAnchor(previousPickDateObject)

	const quotes = dbQuotes.map(({characters, ...quote}) => ({
		...quote,
		character: Array.isArray(characters) ? characters[0] : characters,
	}))

	const imageUrlTitle = `The emoji of the day is ‘${emoji.name}’!`
	const ogImageUrlObject = new URL(`${url.origin}/api/og`)
	ogImageUrlObject.searchParams.set('emoji', emoji.character)
	ogImageUrlObject.searchParams.set('copy', imageUrlTitle)

	return {
		emoji,
		quotes,
		remainingCharacters: charactersResult.data,
		previousPick,
		meta: {
			title: `${emoji.character} is the emoji of today!`,
			description: `The official emoji of the day is ${emoji.character}! And we asked ${
				quotes[0].character?.name ?? 'famous fictional characters'
			} for a quote... Read on to find out ${emoji.character}`,
			image: {
				url: ogImageUrlObject.href,
				alt: imageUrlTitle,
			},
		},
	}
}) satisfies PageServerLoad

export const actions = {
	quote: async ({request, locals}) => {
		const data = await request.formData()
		const emojiCode = data.get('emoji_code')
		const characterId = data.get('character_id')

		if (typeof emojiCode !== 'string' || typeof characterId !== 'string') {
			return fail(400, {
				error: 'You need to provide both the emoji of the day and a character',
			})
		}

		const [existingQuotesResult, characterResult, emojiResult] = await Promise.all([
			locals.supabase
				.from('quotes')
				.select(
					`
					content,
					characters (
						id,
						name,
						title
					)`
				)
				.eq('emoji_code', emojiCode)
				.eq('character_id', characterId)
				.limit(1)
				.maybeSingle(),
			locals.supabase.from('characters').select('name, franchise').eq('id', characterId).single(),
			locals.supabase.from('emojis').select('character').eq('code', emojiCode).single(),
		])

		if (existingQuotesResult.error) {
			return fail(400, {error: `Unable to check for quotes! ${existingQuotesResult.error}`})
		}

		if (existingQuotesResult.data) {
			return {success: true, quote: existingQuotesResult.data}
		}

		if (characterResult.error) {
			return fail(400, {error: `Could not find given character! ${characterResult.error}`})
		}

		if (emojiResult.error) {
			return fail(400, {error: `Could not find given emoji! ${emojiResult.error}`})
		}

		const character = characterResult.data
		const emoji = emojiResult.data

		const quote = await createChatCompletion([
			{
				role: 'system',
				content: `You are ${character.name} from ${character.franchise}. Please only respond as ${character.name}`,
			},
			{
				role: 'user',
				content: `The emoji of the day is ‘${emoji.character}’! How does ‘${emoji.character}’ inspire you?`,
			},
		])

		if (!quote) {
			return fail(500, {emojiCode, error: `Could not get ${character.name} to speak!`})
		}

		const insertQuoteResult = await supabaseServiceClient
			.from('quotes')
			.insert({
				emoji_code: emojiCode,
				character_id: characterId,
				content: quote,
			})
			.select(
				`
				content,
				characters (
					id,
					name,
					title
				)`
			)
			.single()

		return {success: true, quote: insertQuoteResult.data}
	},
	theme: async ({cookies, request}) => {
		const data = await request.formData()
		const theme = data.get('theme')

		if (!isValidTheme(theme)) {
			return fail(400, {error: `invalid theme: ${theme}}`})
		}

		cookies.set('theme', theme, {path: '/', maxAge: TEN_YEARS_IN_SECONDS})

		return {theme}
	},
} satisfies Actions
