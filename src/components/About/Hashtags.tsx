import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { HashtagsQuery } from '../../generated/graphql'
import { ErrorNotice } from '../ErrorNotice'

const HASHTAGS_QUERY = gql`
  query Hashtags {
    hashtags
  }
`
const Container = styled.ul`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
`

export const Hashtags = () => {
  const { loading, error, data } = useQuery<HashtagsQuery>(HASHTAGS_QUERY)

  if (error) {
    return <ErrorNotice />
  }

  return !loading && data ? (
    <Container>
      {data.hashtags.map((hashtag) => (
        <li key={hashtag}>
          <strong>{hashtag}</strong>
        </li>
      ))}
    </Container>
  ) : null
}
