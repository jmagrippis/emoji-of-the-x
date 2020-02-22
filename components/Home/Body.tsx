import React from 'react'

import classes from './Body.module.css'
import { Emoji } from '../types'

export const Body = ({ character, name }: Emoji) => {
  return (
    <main className="flex flex-col items-center">
      <div className={`${classes.character} mb-4`}>{character}</div>
      <div className="text-2xl">“{name}”</div>
    </main>
  )
}
