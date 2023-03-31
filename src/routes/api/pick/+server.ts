import {error, json} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {CRON_API_KEY} from '$env/static/private'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'
import {createChatCompletion} from '$lib/server/openaiClient'
import {getIsoDate} from '$lib/getIsoDate'

export const GET: RequestHandler = async ({url}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== CRON_API_KEY) {
		throw error(400, 'Invalid API key')
	}

	const isoDate = getIsoDate(new Date())
	const existingPickResult = await supabaseServiceClient
		.from('picks')
		.select()
		.eq('created_at', isoDate)
		.maybeSingle()

	if (existingPickResult.error) {
		throw error(400, `Could not check pick results: ${existingPickResult.error.message}`)
	}

	if (existingPickResult.data) {
		return json(existingPickResult.data)
	}

	const randomEmojiResult = await supabaseServiceClient
		.rpc('random_emoji')
		.select('code, character')
		.single()

	if (randomEmojiResult.error) {
		throw error(400, `Could not select a random emoji: ${randomEmojiResult.error.message}`)
	}

	const randomEmoji = randomEmojiResult.data

	const insertResult = await supabaseServiceClient
		.from('picks')
		.insert({
			emoji_code: randomEmoji.code,
			created_at: isoDate,
		})
		.select()
		.single()

	if (insertResult.error || !insertResult.data) {
		throw error(400, `Could not persist pick: ${insertResult.error?.message ?? 'no data'}`)
	}

	const randomCharacterResult = await supabaseServiceClient
		.rpc('random_character')
		.select('id, name, franchise')
		.single()

	if (randomCharacterResult.error) {
		throw error(400, `Could not select a random character: ${randomCharacterResult.error.message}`)
	}

	const character = randomCharacterResult.data

	const quote = await createChatCompletion([
		{
			role: 'system',
			content: `You are ${character.name} from ${character.franchise}. Please only respond as ${character.name}`,
		},
		{
			role: 'user',
			content: `The emoji of the day is "${randomEmoji.character}"! How does "${randomEmoji.character}" inspire you?`,
		},
	])

	const insertQuoteResult = await supabaseServiceClient
		.from('quotes')
		.insert({
			emoji_code: randomEmoji.code,
			character_id: character.id,
			content:
				quote ?? `Of all the quotes about ${randomEmoji.character}, this is certainly one of them.`,
		})
		.maybeSingle()

	if (insertQuoteResult.error) {
		throw error(400, `Could not persist quote: ${insertQuoteResult.error}`)
	}

	return json(insertResult.data)
}
