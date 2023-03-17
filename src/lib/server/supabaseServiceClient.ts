import {createClient} from '@supabase/supabase-js'

import {SUPABASE_ACCESS_TOKEN} from '$env/static/private'
import {PUBLIC_SUPABASE_URL} from '$env/static/public'

export const supabaseServiceClient = createClient(PUBLIC_SUPABASE_URL, SUPABASE_ACCESS_TOKEN)
