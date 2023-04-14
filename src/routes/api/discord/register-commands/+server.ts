import type {RequestHandler} from './$types'
import {EMOJI_ME_COMMAND, EMOJI_OF_THE_DAY_COMMAND} from '../commands'
import {DISCORD_BOT_TOKEN, INTERNAL_API_KEY} from '$env/static/private'
import {PUBLIC_DISCORD_APPLICATION_ID} from '$env/static/public'

export const GET = (async ({url}) => {
	const apiKey = url.searchParams.get('apiKey')

	if (apiKey !== INTERNAL_API_KEY) {
		return new Response('Invalid API key', {status: 400})
	}

	const commands = [EMOJI_ME_COMMAND, EMOJI_OF_THE_DAY_COMMAND]
	const response = await fetch(
		`https://discord.com/api/v10/applications/${PUBLIC_DISCORD_APPLICATION_ID}/commands`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
			},
			method: 'PUT',
			body: JSON.stringify(commands),
		}
	)

	if (!response.ok) {
		return new Response(`failed to register commands ${response.statusText}`, {status: 500})
	}

	return new Response(`${commands.length} command${commands.length > 1 ? 's' : ''} registered`)
}) satisfies RequestHandler
