import React, { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { TrioQuery, TrioQueryVariables } from '../../generated/graphql'

const Body = lazy(() => import('./Body'))

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
  const anchor = day && month && year ? `${year}/${month}/${day}` : null
  const { loading, error, data } = useQuery<TrioQuery, TrioQueryVariables>(
    TRIO_QUERY,
    {
      variables: { anchor },
    }
  )

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
          <title>
            {data.trio.current.character} {anchor ? 'was' : 'is'} the emoji of
            the day - {data.trio.current.name}
          </title>
        </Helmet>
      )}
      <Suspense fallback={null}>
        <Body
          previous={data?.trio?.previous}
          current={data?.trio?.current}
          next={data?.trio?.next}
          loading={loading}
        />
      </Suspense>
    </>
  )
}

export default Home
