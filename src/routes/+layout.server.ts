import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({locals, url}) => {
	const {getSession, theme} = locals

	const ogImageUrl = `${url.origin}/api/og`

	return {
		session: getSession(),
		theme,
		defaultMeta: {
			title: 'Emoji of the Day 👑',
			description: 'The first app to decide the emoji of the Day / Week / Month / Year 👑',
			image: {
				url: ogImageUrl,
				alt: 'The official app to pick the emoji of the day',
			},
		},
	}
}
