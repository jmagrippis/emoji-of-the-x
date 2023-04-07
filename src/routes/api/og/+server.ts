import {error} from '@sveltejs/kit'
import satori from 'satori'

import type {RequestHandler} from './$types'

const brandHue = '142deg'

const surfaceColor = `hsl(${brandHue} 10% 10%)`
const copyColor = `hsl(${brandHue} 100% 97%)`

export const GET = (async ({fetch, url, locals}) => {
	const emojiCode = url.searchParams.get('code') ?? 'U+1F973'

	const result = await locals.supabase.from('emojis').select('code, character, name').eq('code', emojiCode).single()

	if (result.error || !result.data) {
		throw error(404, { message: `could not find an emoji with a code of "${emojiCode}"`})
	}

	const alefData = await fetch('/fonts/Alef-Regular.ttf').then((res) => res.arrayBuffer())
	const notoEmojiData = await fetch('/fonts/NotoEmoji-Regular.ttf').then((res) => res.arrayBuffer())

	const emoji = result.data

	const svg = await satori(
		{
			type: 'div',
			props: {
				children: [{
					type: 'div',
					props: {
						children: emoji.character,
						style: { fontSize: '360px', 'flex-shrink': 0},
					},
				},
				{
					type: 'div',
					props: {
						children: `The emoji of the day is "${emoji.name}"!`,
					},
					style: {'flex-shrink': 0}
				}
			],
				style: { backgroundColor: surfaceColor, color: copyColor, width: '100%', height: '100%', display: 'flex', fontFamily: 'Alef, sans-serif, "Noto Emoji"', fontSize: '64px', gap: '32px', padding: '16px', 'align-items': 'center' },
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{name: 'Alef', data: alefData, weight: 400, style: 'normal'},
				{name: 'Noto Emoji', data: notoEmojiData, weight: 400},
			],
		}
	)
	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
		},
	})
}) satisfies RequestHandler
