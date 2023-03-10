import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({locals}) => {
	const {theme} = locals

	return {
		theme,
		defaultMeta: {
			title: 'Emoji of the Day 👑',
			description: 'The first app to decide the emoji of the Day / Week / Month / Year 👑',
		},
	}
}
