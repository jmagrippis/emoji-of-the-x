import {error, json} from '@sveltejs/kit'
import {CRON_API_KEY} from '$env/static/private'

import type {RequestHandler} from './$types'
import {reduceEmojis} from './reduceEmojis'

export const GET: RequestHandler = async ({fetch, url}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== CRON_API_KEY) {
		throw error(400, 'Invalid API key')
	}
	const html = await fetch('https://unicode.org/emoji/charts/full-emoji-list.html').then(
		(response) => response.text()
	)

	const emojis = reduceEmojis(html)
	// TODO: Persist emojis that are not already in the DB

	const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
	return json(randomEmoji)
}
