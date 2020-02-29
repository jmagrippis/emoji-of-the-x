import { Emoji } from '../../generated/graphql'

export type EmojiPartial = Pick<Emoji, 'type' | 'character'>

export const findNewPick = (
  nextPicks: EmojiPartial[],
  prevPicks: EmojiPartial[]
) =>
  nextPicks.find(({ character, type }) =>
    prevPicks.some((pick) => pick.type === type && pick.character !== character)
  ) || null
