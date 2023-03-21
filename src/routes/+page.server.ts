import {fail, type Actions} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'
import {isValidTheme} from '../hooks.server'

const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60

export const load: PageServerLoad = async ({locals}) => {
	const pickResult = await locals.supabase
		.from('picks')
		.select(
			`
			id,
			created_at,
			emojis(
				code,
				character,
				name,
				quotes (
					content,
					characters (
						name,
						title
					)
				)
			)
	`
		)
		.limit(1)
		.order('created_at', {ascending: false})
		.single()

	if (pickResult.error) {
		return fail(500, {error: pickResult.error.message})
	}
	const pick = pickResult.data
	const emoji = Array.isArray(pick.emojis) ? pick.emojis[0] : pick.emojis
	if (!emoji) {
		return fail(500, {error: 'could not find emoji for current date'})
	}
	const quotes = emoji.quotes ? (Array.isArray(emoji.quotes) ? emoji.quotes : [emoji.quotes]) : []

	return {
		emoji,
		quotes:
			quotes.map(({characters, ...quote}) => ({
				...quote,
				character: Array.isArray(characters) ? characters[0] : characters,
			})) ?? [],
	}
}

export const actions: Actions = {
	theme: async ({cookies, request}) => {
		const data = await request.formData()
		const theme = data.get('theme')

		if (!isValidTheme(theme)) {
			return fail(400, {theme, missing: true})
		}

		cookies.set('theme', theme, {path: '/', maxAge: TEN_YEARS_IN_SECONDS})

		return {success: true}
	},
}
