import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import classes from './Body.module.css'
import { Trio } from '../../src/getTrio'
import ArrowBack from './arrow_back.svg'
import ArrowForward from './arrow_forward.svg'

type Props = Trio

const getDaySlug = (date: Date) =>
  `/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

export const Body = ({ current, previous, next }: Props) => (
  <main className="w-full flex items-center">
    <div
      className={cn('m2', {
        'opacity-0': !previous,
      })}
    >
      <Link href={previous ? getDaySlug(new Date(previous.created_at)) : '/'}>
        <a
          className={cn('m2', {
            'cursor-default': !previous,
          })}
        >
          <ArrowBack className="text-green-200" width="4rem" />
        </a>
      </Link>
    </div>
    <div className="flex-grow flex flex-col items-center">
      <div className={`${classes.character} mb-4`}>{current.character}</div>
      <div className="text-xl">“{current.name}”</div>
    </div>
    <div
      className={cn('m2', {
        'opacity-0': !next,
        'cursor-default': !next,
      })}
    >
      <Link href={next ? getDaySlug(new Date(next.created_at)) : '/'}>
        <a
          className={cn('m2', {
            'cursor-default': !next,
          })}
        >
          <ArrowForward className="text-green-200" width="4rem" />
        </a>
      </Link>
    </div>
  </main>
)
