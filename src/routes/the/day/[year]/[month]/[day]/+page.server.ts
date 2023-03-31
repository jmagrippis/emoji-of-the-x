import {fail} from '@sveltejs/kit'

import {getIsoDate} from '$lib/getIsoDate'
import {getRelativeAnchor} from '$lib/getRelativeAnchor'

import type {PageServerLoad} from './$types'

export const load = (async ({locals, params}) => {
	const {year, month, day} = params
	const date = `${year}/${month}/${day}`
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
						id,
						name,
						title
					)
				)
			)
	`
		)
		.limit(1)
		.eq('created_at', date)
		.single()

	if (pickResult.error) {
		return fail(500, {error: pickResult.error.message})
	}
	const pick = pickResult.data
	const emoji = Array.isArray(pick.emojis) ? pick.emojis[0] : pick.emojis
	if (!emoji) {
		return fail(500, {error: `could not find emoji for ${date}`})
	}
	const quotes = emoji.quotes ? (Array.isArray(emoji.quotes) ? emoji.quotes : [emoji.quotes]) : []

	const previousPickDateObject = new Date(pick.created_at)
	previousPickDateObject.setDate(previousPickDateObject.getDate() - 1)
	const previousPickDate = getIsoDate(previousPickDateObject)

	const nextPickDateObject = new Date(pick.created_at)
	nextPickDateObject.setDate(nextPickDateObject.getDate() + 1)
	const nextPickDate = getIsoDate(nextPickDateObject)

	const [previousPickResult, nextPickResult] = await Promise.all([
		locals.supabase
			.from('picks')
			.select('created_at')
			.limit(1)
			.eq('created_at', previousPickDate)
			.maybeSingle(),
		locals.supabase
			.from('picks')
			.select('created_at')
			.limit(1)
			.eq('created_at', nextPickDate)
			.maybeSingle(),
	])

	return {
		emoji,
		quotes:
			quotes.map(({characters, ...quote}) => ({
				...quote,
				character: Array.isArray(characters) ? characters[0] : characters,
			})) ?? [],
		previousPick: previousPickResult.data ? getRelativeAnchor(new Date(previousPickDate)) : null,
		nextPick: nextPickResult.data
			? getIsoDate(new Date()) === nextPickDate
				? '/'
				: getRelativeAnchor(new Date(nextPickDate))
			: null,
	}
}) satisfies PageServerLoad
