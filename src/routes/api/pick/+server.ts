import {error, json} from '@sveltejs/kit'
import {CRON_API_KEY} from '$env/static/private'

import type {RequestHandler} from './$types'

export const GET: RequestHandler = async ({url}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== CRON_API_KEY) {
		throw error(400, 'Invalid API key')
	}

	// TODO: Pick a random emoji from the DB
	const notRandomEmoji = {
		code: 'U+1F937',
		character: '🤷',
		name: 'person shrugging',
	}

	return json(notRandomEmoji)
}
