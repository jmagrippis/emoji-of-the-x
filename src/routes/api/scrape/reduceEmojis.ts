import {Window} from 'happy-dom'
type Emoji = {
	code: string
	character: string
	shortName: string
}
export const reduceEmojis = (html: string) => {
	const window = new Window()
	window.document.body.innerHTML = html
	const emojiTableRows = window.document.querySelectorAll('tr')

	const emojiRows = emojiTableRows.reduce<Emoji[]>((acc, row) => {
		const isItEmojiRow = !!row.querySelector('td.code')
		if (isItEmojiRow) {
			const code = row.querySelector('td.code').textContent
			const character = row.querySelector('td.chars').textContent
			const shortName = row.querySelector('td.name').textContent
			acc.push({code, character, shortName})
		}
		return acc
	}, [])

	return emojiRows
}
