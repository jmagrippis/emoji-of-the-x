import fetch from 'isomorphic-unfetch'
import qs from 'qs'

import { API } from './constants'
import { Emoji } from './types'

export type Trio = {
  current: Emoji
  previous?: Emoji
  next?: Emoji
}

export const getTrio = async (anchor: string | null): Promise<Trio> => {
  const res = await fetch(
    `${API}/trios/day${
      anchor ? qs.stringify({ anchor }, { addQueryPrefix: true }) : ''
    }`
  )

  return res.json()
}
