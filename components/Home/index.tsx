import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useRouter } from 'next/router'

import { Body } from './Body'
import { Meta } from '../Meta'

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
  const {
    query: { anchorParts },
  } = useRouter()

  const { error, data } = useQuery(TRIO_QUERY, {
    variables:
      anchorParts && Array.isArray(anchorParts)
        ? { anchor: anchorParts.join('/') }
        : undefined,
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
      {data?.trio?.current && (
        <Meta
          title={`${data?.trio.current.character} is the emoji of the day - ${data?.trio.current.name}`}
        />
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
