import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { Body } from './Body'
import { TrioQuery, TrioQueryVariables } from '../../generated/graphql'

const TRIO_QUERY = gql`
  query Trio($anchor: String) {
    trio(anchor: $anchor) {
      current {
        id
        character
        name
        created_at
      }
      next {
        id
        character
        name
        created_at
      }
      previous {
        id
        character
        name
        created_at
      }
    }
  }
`

const Home = () => {
  const { year, month, day } = useParams()
  const { error, data } = useQuery<TrioQuery, TrioQueryVariables>(TRIO_QUERY, {
    variables:
      day && month && year ? { anchor: `${year}/${month}/${day}` } : undefined,
  })

  if (error) {
    return (
      <div>
        <div>There's been an error.</div>{' '}
        <div>It is with great same that I ask you to refresh.</div>
      </div>
    )
  }

  return (
    <>
      {data?.trio && (
        <Helmet>
          <title>{data.trio.current.character} is the emoji of the day</title>
        </Helmet>
      )}
      <Body
        previous={data?.trio?.previous}
        current={data?.trio?.current}
        next={data?.trio?.next}
      />
    </>
  )
}

export default Home
