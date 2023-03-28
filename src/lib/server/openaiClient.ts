import {OPEN_AI_API_KEY} from '$env/static/private'

export type OpenAIMessage = {
	role: 'user' | 'system'
	content: string
}

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

	const {choices} = await response.json()

	return choices[0]?.message?.content
}
