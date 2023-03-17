import {Configuration, OpenAIApi} from 'openai'

import {OPEN_AI_API_KEY} from '$env/static/private'

const configuration = new Configuration({
	apiKey: OPEN_AI_API_KEY,
})

export const openai = new OpenAIApi(configuration)
