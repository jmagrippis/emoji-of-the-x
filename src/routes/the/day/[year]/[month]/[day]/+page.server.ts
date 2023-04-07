import {error} from '@sveltejs/kit'

import {getIsoDate} from '$lib/getIsoDate'
import {getRelativeAnchor} from '$lib/getRelativeAnchor'

import type {PageServerLoad} from './$types'

export const load = (async ({locals, params, url}) => {
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
		.maybeSingle()

	if (pickResult.error) {
		throw pickResult.error
	}

	const pick = pickResult.data
	const emoji = Array.isArray(pick?.emojis) ? pick?.emojis[0] : pick?.emojis

	if (!pick || !emoji) {
		throw error(404, {message: `could not find emoji for ${date}`})
	}

	const dbQuotes = emoji.quotes ? (Array.isArray(emoji.quotes) ? emoji.quotes : [emoji.quotes]) : []
	const quotes = dbQuotes.map(({characters, ...quote}) => ({
		...quote,
		character: Array.isArray(characters) ? characters[0] : characters,
	}))
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

	const imageUrlTitle = `The emoji of ${date} is ‘${emoji.name}’!`
	const ogImageUrlObject = new URL(`${url.origin}/api/og`)
	ogImageUrlObject.searchParams.set('emoji', emoji.character)
	ogImageUrlObject.searchParams.set('copy', imageUrlTitle)

	return {
		emoji,
		quotes,
		previousPick: previousPickResult.data ? getRelativeAnchor(new Date(previousPickDate)) : null,
		nextPick: nextPickResult.data
			? getIsoDate(new Date()) === nextPickDate
				? '/'
				: getRelativeAnchor(new Date(nextPickDate))
			: null,
		meta: {
			title: `${emoji.character} is the emoji of ${date}!`,
			description: `The official emoji of ${date} was ${emoji.character}! And we asked ${
				quotes[0].character?.name ?? 'famous fictional characters'
			} for a quote... Read on to find out ${emoji.character}`,
			image: {
				url: ogImageUrlObject.href,
				alt: imageUrlTitle,
			},
		},
	}
}) satisfies PageServerLoad
