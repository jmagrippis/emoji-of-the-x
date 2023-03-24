import {parse} from 'node-html-parser'

type Emoji = {
	code: string
	character: string
	name: string
}
export const reduceEmojis = (html: string) => {
	const root = parse(html)

	const emojiTableRows = root.querySelectorAll('tr')

	const emojiRows = emojiTableRows.reduce<Emoji[]>((acc, row) => {
		const code = row.querySelector('td.code')?.textContent
		const character = row.querySelector('td.chars')?.textContent
		const name = row.querySelector('td.name')?.textContent
		if (code && character && name) {
			acc.push({code, character, name})
		}
		return acc
	}, [])

	return emojiRows
}
