import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({locals}) => {
	const {getSession, theme} = locals

	return {
		session: getSession(),
		theme,
		defaultMeta: {
			title: 'Emoji of the Day 👑',
			description: 'The first app to decide the emoji of the Day / Week / Month / Year 👑',
		},
	}
}
