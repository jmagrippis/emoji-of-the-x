import {fail, type Actions} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'
import {isValidTheme} from '../hooks.server'
import {createChatCompletion} from '$lib/server/openaiClient'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'

const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60

export const load: PageServerLoad = async ({locals}) => {
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
		return fail(500, {error: pickResult.error.message})
	}
	const pick = pickResult.data
	const emoji = Array.isArray(pick.emojis) ? pick.emojis[0] : pick.emojis
	if (!emoji) {
		return fail(500, {error: 'could not find emoji for current date'})
	}
	const quotes = emoji.quotes ? (Array.isArray(emoji.quotes) ? emoji.quotes : [emoji.quotes]) : []

	const quotedCharacterIds = quotes.reduce<Record<string, string>>((acc, {characters}) => {
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

	return {
		emoji,
		quotes:
			quotes.map(({characters, ...quote}) => ({
				...quote,
				character: Array.isArray(characters) ? characters[0] : characters,
			})) ?? [],
		remainingCharacters: charactersResult.data,
	}
}

export const actions: Actions = {
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
				content: `The emoji of the day is "${emoji.character}"! How does "${emoji.character}" inspire you?`,
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
}
