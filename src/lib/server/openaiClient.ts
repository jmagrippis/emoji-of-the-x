import {OPEN_AI_API_KEY} from '$env/static/private'

export type OpenAIMessage = {
	role: 'user' | 'system' | 'assistant'
	content: string
}

export type OpenAIChoice = {
	index: number
	message: OpenAIMessage
	// stop: API returned complete model output
	// length: Incomplete model output due to max_tokens parameter or token limit
	// content_filter: Omitted content due to a flag from our content filters
	// null: API response still in progress or incomplete
	finish_reason: 'stop' | 'length' | 'content_filter' | 'null'
}

type OpenAIChatCompletion = {
	id: string
	object: string
	created: number
	choices: OpenAIChoice[]
	usage: {
		prompt_tokens: number
		completion_tokens: number
		total_tokens: number
	}
}

const isChatCompletion = (json: unknown): json is OpenAIChatCompletion =>
	typeof json === 'object' && !!(json as OpenAIChatCompletion).choices[0]?.message?.content

export const createChatCompletion = async (messages: OpenAIMessage[]): Promise<string | null> => {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPEN_AI_API_KEY}`,
		}),
		body: JSON.stringify({
			model: 'gpt-4',
			messages,
		}),
	})

	if (!response.ok) {
		throw new Error(`Error connecting to OpenAI: ${response.status} ${response.statusText}`)
	}

	const json = await response.json()

	return isChatCompletion(json) ? json.choices[0].message.content : null
}
