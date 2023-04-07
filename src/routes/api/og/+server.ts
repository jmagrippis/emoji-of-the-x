import satori from 'satori'

import type {RequestHandler} from './$types'

const brandHue = '142deg'

const surfaceColor = `hsl(${brandHue} 10% 10%)`
const copyColor = `hsl(${brandHue} 100% 97%)`

export const GET = (async ({fetch, url}) => {
	const emoji = url.searchParams.get('emoji') ?? '👑'

	const alefData = await fetch('/fonts/Alef-Regular.ttf').then((res) => res.arrayBuffer())
	const notoEmojiData = await fetch('/fonts/NotoEmoji-Regular.ttf').then((res) => res.arrayBuffer())

	const copy = url.searchParams.get('copy') ?? `The official app to crown the emoji of the day 🤴!`

	const svg = await satori(
		{
			type: 'div',
			props: {
				children: [
					{
						type: 'div',
						props: {
							children: emoji,
							style: {fontSize: '360px', 'flex-shrink': 0},
						},
					},
					{
						type: 'div',
						props: {
							children: copy,
						},
						style: {'flex-shrink': 0},
					},
				],
				style: {
					backgroundColor: surfaceColor,
					color: copyColor,
					width: '100%',
					height: '100%',
					display: 'flex',
					fontFamily: 'Alef, sans-serif, "Noto Emoji"',
					fontSize: '64px',
					gap: '32px',
					padding: '16px',
					'align-items': 'center',
				},
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
