import {it, expect} from 'vitest'

import {reduceEmojis} from './reduceEmojis'
import sampleEmojisTable from './sampleEmojisTable.html?raw'

it('returns all rows in the given HTML that have emojis in them', () => {
	const emojis = reduceEmojis(sampleEmojisTable)

	expect(emojis).toHaveLength(29)
})

it('returns objects with an emoji character', () => {
	const emojis = reduceEmojis(sampleEmojisTable)

	expect(emojis[10].character).toBe('🫠')
})

it('returns objects with a `shortName`', () => {
	const emojis = reduceEmojis(sampleEmojisTable)

	expect(emojis[21].shortName).toBe('kissing face with smiling eyes')
})

it('returns objects with a `code`', () => {
	const emojis = reduceEmojis(sampleEmojisTable)

	expect(emojis[13].code).toBe('U+1F607')
})
