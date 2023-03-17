import {createClient} from '@supabase/supabase-js'

import {SUPABASE_ACCESS_TOKEN} from '$env/static/private'
import {PUBLIC_SUPABASE_URL} from '$env/static/public'
import type {Database} from '$lib/generated/database.types'

export const supabaseServiceClient = createClient<Database>(
	PUBLIC_SUPABASE_URL,
	SUPABASE_ACCESS_TOKEN
)
