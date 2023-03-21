import {fail, type Actions} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'
import {isValidTheme} from '../hooks.server'

const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60

export const load: PageServerLoad = async ({locals}) => {
	const emojiResult = await locals.supabase
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

	if (emojiResult.error) {
		return fail(500, {error: emojiResult.error.message})
	}
	const pick = emojiResult.data
	const emoji = Array.isArray(pick.emojis) ? pick.emojis[0] : pick.emojis
	if (!emoji) {
		return fail(500, {error: 'could not find emoji for current date'})
	}

	const quoteResult = await locals.supabase
		.from('quotes')
		.select(
			`
			content,
			characters (
				name,
				title
			)
	`
		)
		.eq('pick_id', pick.id)

	return {
		emoji,
		quotes:
			quoteResult.data?.map(({characters, ...quote}) => ({
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
