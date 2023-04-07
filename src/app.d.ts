// See https://kit.svelte.dev/docs/types#app
import type {Database} from '$lib/generated/database.types'
import type {SupabaseClient, Session} from '@supabase/supabase-js'

import type {Theme} from './hooks.server'
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
			theme: Theme
		}
		interface PageData {
			theme: Theme
			defaultMeta: {
				title: string
				description: string
				image: {
					url: string
					alt: string
				}
			}
		}
		// interface Platform {}
	}

	// declarations for
	// https://github.com/poppa/sveltekit-svg
	declare module '*.svg?component' {
		import type {ComponentType, SvelteComponentTyped} from 'svelte'
		import type {SVGAttributes} from 'svelte/elements'

		const content: ComponentType<SvelteComponentTyped<SVGAttributes<SVGSVGElement>>>

		export default content
	}

	declare module '*.svg?src' {
		const content: string
		export default content
	}

	declare module '*.svg?url' {
		const content: string
		export default content
	}

	declare module '*.svg?dataurl' {
		const content: string
		export default content
	}
}

export {}
