import {error, json} from '@sveltejs/kit'
import {CRON_API_KEY} from '$env/static/private'

import type {RequestHandler} from './$types'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'
import {openai} from '$lib/server/openai'

export const GET: RequestHandler = async ({url}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== CRON_API_KEY) {
		throw error(400, 'Invalid API key')
	}

	const [isoDate] = new Date().toISOString().split('T')
	const existingPickResult = await supabaseServiceClient
		.from('picks')
		.select()
		.eq('created_at', isoDate)
		.maybeSingle()

	if (existingPickResult.error) {
		throw error(400, `Could not check pick results: ${existingPickResult.error.message}`)
	}

	if (existingPickResult.data) {
		return json({...existingPickResult.data, date: isoDate})
	}

	const allEmojisResult = await supabaseServiceClient
		.from('emojis')
		.select('code, character')
		.eq('hidden', false)

	if (allEmojisResult.error) {
		throw error(400, `Could not select emojis: ${allEmojisResult.error.message}`)
	}

	const randomEmoji = allEmojisResult.data[Math.floor(Math.random() * allEmojisResult.data.length)]

	const insertResult = await supabaseServiceClient
		.from('picks')
		.insert({
			emoji_code: randomEmoji.code,
			created_at: isoDate,
		})
		.select()
		.maybeSingle()

	if (insertResult.error || !insertResult.data) {
		throw error(400, `Could not persist pick: ${insertResult.error?.message ?? 'no data'}`)
	}

	const characterResult = await supabaseServiceClient
		.from('characters')
		.select('id, name, franchise')
		.limit(1)
		.single()

	if (characterResult.error || !characterResult.data) {
		throw error(400, `Could not select a random character: ${characterResult.error.message}`)
	}

	const character = characterResult.data

	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{role: 'system', content: `You are ${character.name} from ${character.franchise}.`},
			{
				role: 'user',
				content: `How would "${randomEmoji.character}" inspire you?`,
			},
		],
	})
	const firstResponseChoice = response.data?.choices?.[0]

	const insertQuoteResult = await supabaseServiceClient
		.from('quotes')
		.insert({
			pick_id: insertResult.data.id,
			character_id: character.id,
			content:
				firstResponseChoice && firstResponseChoice.message
					? firstResponseChoice.message.content
					: `The best way to predict the future is to invent it.`,
		})
		.maybeSingle()

	if (insertQuoteResult.error) {
		throw error(400, `Could not persist pick: ${insertResult.error}`)
	}

	return json(insertResult.data)
}
