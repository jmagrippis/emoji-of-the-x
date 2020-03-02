import React, { lazy, Suspense } from 'react'
import { useRouteMatch } from 'react-router-dom'
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

const isEmojiType = (type: any): type is EmojiType =>
  Object.values(EmojiType).includes(type)

const Home = () => {
  const match = useRouteMatch<{ type: string }>('/:type')
  const type =
    match && isEmojiType(match.params.type) ? match.params.type : EmojiType.Day
  const { loading, error, data } = useQuery<EmojisQuery, EmojisQueryVariables>(
    EMOJIS_QUERY,
    {
      variables: { type },
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
