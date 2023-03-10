import {fail, type Actions} from '@sveltejs/kit'
import {CRON_API_KEY} from '$env/static/private'

import type {PageServerLoad} from './$types'
import {isValidTheme} from '../hooks.server'

const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60

export const load: PageServerLoad = async ({fetch}) => {
	const emoji = await fetch(`/api/pick?apiKey=${CRON_API_KEY}`).then((response) => response.json())

	return {emoji}
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
