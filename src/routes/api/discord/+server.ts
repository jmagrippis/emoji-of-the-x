import {json} from '@sveltejs/kit'
import {InteractionResponseType, InteractionType, verifyKey} from 'discord-interactions'

import {PUBLIC_DISCORD_KEY} from '$env/static/public'
import type {RequestHandler} from './$types'
import {EMOJI_ME_COMMAND, EMOJI_OF_THE_DAY_COMMAND} from './commands'
import {supabaseServiceClient} from '$lib/server/supabaseServiceClient'

const parseDiscordRequest = async (request: Request) => {
	const signature = request.headers.get('X-Signature-Ed25519')
	const timestamp = request.headers.get('X-Signature-Timestamp')

	if (!request.body || !signature || !timestamp) return false

	const payload = await request.json()

	if (!verifyKey(JSON.stringify(payload), signature, timestamp, PUBLIC_DISCORD_KEY)) {
		return false
	}

	return payload
}

export const POST = (async ({request, locals}) => {
	const message = await parseDiscordRequest(request)

	if (!message) {
		return new Response('Bad request signature.', {status: 401})
	}

	if (message.type === InteractionType.PING) {
		return json({type: InteractionType.PING})
	}

	if (message.type === InteractionType.APPLICATION_COMMAND) {
		switch (message.data.name.toLowerCase()) {
			case EMOJI_OF_THE_DAY_COMMAND.name.toLowerCase(): {
				const pickResult = await locals.supabase
					.from('picks')
					.select(
						`
			id,
			created_at,
			emojis(
				code,
				character,
				name
			)
	`
					)
					.limit(1)
					.order('created_at', {ascending: false})
					.single()

				const pick = pickResult.data
				const emoji = Array.isArray(pick?.emojis) ? pick?.emojis[0] : pick?.emojis
				if (!emoji) {
					return new Response('could not find the emoji of the day!', {status: 500})
				}

				return json({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: `The emoji of the day is ${emoji.character}! ‘${emoji.name}’ ${emoji.character}${emoji.character}${emoji.character}`,
					},
				})
			}
			case EMOJI_ME_COMMAND.name.toLowerCase(): {
				const randomEmojiResult = await supabaseServiceClient
					.rpc('random_emoji')
					.select('code, character')
					.single()

				if (!randomEmojiResult.data) {
					return new Response('could not return random emoji', {status: 500})
				}

				return json({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: randomEmojiResult.data.character,
					},
				})
			}
			default:
				return json({error: 'Unknown Command'}, {status: 400})
		}
	}

	return json({error: 'Unknown Type'}, {status: 400})
}) satisfies RequestHandler
