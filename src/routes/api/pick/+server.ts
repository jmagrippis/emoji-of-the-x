import {error, json} from '@sveltejs/kit'
import {CRON_API_KEY} from '$env/static/private'

import type {RequestHandler} from './$types'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'

export const GET: RequestHandler = async ({url, locals}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== CRON_API_KEY) {
		throw error(400, 'Invalid API key')
	}

	const allEmojisResult = await supabaseServiceClient
		.from('emojis')
		.select('code')
		.eq('hidden', false)

	if (allEmojisResult.error) {
		throw error(400, `Could not select emojis: ${allEmojisResult.error}`)
	}

	const randomCode =
		allEmojisResult.data[Math.floor(Math.random() * allEmojisResult.data.length)].code

	const pickResult = await supabaseServiceClient
		.from('emojis')
		.select('code, character, name')
		.eq('code', randomCode)
		.limit(1)
		.single()

	if (pickResult.error) {
		throw error(400, `Could not pick emoji: ${pickResult.error}`)
	}

	return json(pickResult.data)
}
