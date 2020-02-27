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

const isEmojiType = (type: any): type is EmojiType =>
  Object.values(EmojiType).includes(type)

const Home = () => {
  const { type } = useParams()
  const { loading, error, data } = useQuery<EmojisQuery, EmojisQueryVariables>(
    EMOJIS_QUERY,
    {
      variables: {
        type: isEmojiType(type) ? type : EmojiType.Day,
      },
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
