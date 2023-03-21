import {error} from '@sveltejs/kit'
import {CRON_API_KEY} from '$env/static/private'

import type {RequestHandler} from './$types'
import {reduceEmojis} from './reduceEmojis'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'

export const GET: RequestHandler = async ({fetch, url}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== CRON_API_KEY) {
		throw error(400, 'Invalid API key')
	}
	const html = await fetch('https://unicode.org/emoji/charts/full-emoji-list.html').then(
		(response) => response.text()
	)

	const emojis = reduceEmojis(html)

	const result = await supabaseServiceClient
		.from('emojis')
		.upsert(emojis, {count: 'exact', onConflict: 'code'})

	if (result.error) {
		throw error(400, result.error)
	}

	return new Response(`scraped ${result.count} emojis`)
}
