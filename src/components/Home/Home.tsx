import React, { lazy, Suspense } from 'react'
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
  const { loading, error, data } = useQuery<EmojisQuery, EmojisQueryVariables>(
    EMOJIS_QUERY,
    {
      variables: { type: EmojiType.Day },
    }
  )

  if (error) {
    return <ErrorNotice />
  }

  return !loading ? (
    <Suspense fallback={null}>
      <Body emojis={data?.emojis} />
    </Suspense>
  ) : null
}

export default Home
