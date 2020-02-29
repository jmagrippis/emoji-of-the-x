import { findNewPick, EmojiPartial } from './findNewPick'
import { EmojiType } from '../../generated/graphql'

it('returns null for empty arrays', () => {
  expect(findNewPick([], [])).toBe(null)
  expect(findNewPick([], [{ character: '🤡', type: EmojiType.Day }])).toBe(null)
})

it('returns null when the arrays are equal', () => {
  const nextPicks: EmojiPartial[] = [{ character: '🤡', type: EmojiType.Day }]
  const prevPicks: EmojiPartial[] = [{ character: '🤡', type: EmojiType.Day }]

  expect(findNewPick(nextPicks, prevPicks)).toBe(null)
  expect(findNewPick(nextPicks, nextPicks)).toBe(null)
})

it('returns the element that is a new pick', () => {
  const nextPicks: EmojiPartial[] = [
    { character: '🤡', type: EmojiType.Day },
    { character: '🧡', type: EmojiType.Week },
    { character: '🇬🇧', type: EmojiType.Month },
  ]
  const prevPicks: EmojiPartial[] = [
    { character: '🤡', type: EmojiType.Day },
    { character: '🧡', type: EmojiType.Week },
    { character: '🇪🇺', type: EmojiType.Month },
  ]

  expect(findNewPick(nextPicks, prevPicks)).toEqual({
    character: '🇬🇧',
    type: EmojiType.Month,
  })
})
