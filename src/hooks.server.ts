import type {Handle} from '@sveltejs/kit'
import {createSupabaseServerClient} from '@supabase/auth-helpers-sveltekit'
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from '$env/static/public'

export type Theme = 'light' | 'dark' | 'auto'

export const isValidTheme = (theme: FormDataEntryValue | null): theme is Theme =>
	!!theme && (theme === 'light' || theme === 'dark' || theme === 'auto')

const FIVE_MINUTES_IN_SECONDS = 5 * 60

export const handle: Handle = async ({event, resolve}) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event,
	})
	/**
	 * convenience method so that instead of
	 * `const { data: { session } } = await supabase.auth.getSession()`
	 * we call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: {session},
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	const theme = event.cookies.get('theme') ?? 'auto'
	if (isValidTheme(theme)) {
		event.locals.theme = theme
	}

	event.setHeaders({
		'cache-control': `private, max-age=${FIVE_MINUTES_IN_SECONDS}`,
	})

	return resolve(event, {
		transformPageChunk: ({html}) => html.replace('%THEME%', theme),
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
	})
}
