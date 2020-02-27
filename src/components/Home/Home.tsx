import React, { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ErrorNotice } from '../ErrorNotice'
import {
  EmojisQuery,
  EmojisQueryVariables,
  EmojiType,
} from '../../generated/graphql'

const Body = lazy(() => import('./Body'))

const EMOJIS_QUERY = gql`
  query Emojis($type: EmojiType!) {
    emojis(type: $type) {
      id
      type
      anchor
    }
  }
`

const Home = () => {
  const { year, month, day } = useParams()
  const routeAnchor = day && month && year ? `${year}/${month}/${day}` : null
  const { error, data } = useQuery<EmojisQuery, EmojisQueryVariables>(
    EMOJIS_QUERY,
    {
      variables: { type: EmojiType.Day },
    }
  )

  if (error) {
    return <ErrorNotice />
  }

  const currentIndex = routeAnchor
    ? data?.emojis.findIndex(({ anchor }) => anchor === routeAnchor)
    : 0

  return (
    <Suspense fallback={null}>
      <Body
        previous={
          currentIndex !== undefined ? data?.emojis[currentIndex + 1] : null
        }
        current={currentIndex !== undefined ? data?.emojis[currentIndex] : null}
        next={
          currentIndex !== undefined ? data?.emojis[currentIndex - 1] : null
        }
      />
    </Suspense>
  )
}

export default Home
