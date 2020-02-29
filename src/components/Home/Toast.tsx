import React, { useState, useEffect, useCallback } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { LatestPicksQuery, Emoji } from '../../generated/graphql'
import { theme } from '../theme'
import { useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { findNewPick } from './findNewPick'

const LATEST_PICKS_QUERY = gql`
  query LatestPicks {
    latestPicks {
      id
      type
      character
      name
    }
  }
`

const pollInterval = 3600 * 1000

const Container = styled(animated.div)`
  position: fixed;
  color: ${theme.colors.gray[100]};
  background-color: ${theme.colors.green[400]};
  font-size: 1.125rem;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  bottom: 0.25rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  box-shadow: ${theme.shadows.md};

  span {
    font-size: 2rem;
    margin-right: 1rem;
  }
  z-index: 200;
`

const initialStyle = {
  opacity: 0,
  x: -300,
}

export const Toast = () => {
  const { push } = useHistory()
  const { loading, error, data } = useQuery<LatestPicksQuery>(
    LATEST_PICKS_QUERY,
    {
      pollInterval,
    }
  )
  const [latestPicks, setLatestPicks] = useState<
    Pick<Emoji, 'id' | 'type' | 'character' | 'name'>[]
  >([])

  const [style, set] = useSpring(() => initialStyle)

  useEffect(() => {
    if (!data?.latestPicks) return

    if (!latestPicks.length) {
      setLatestPicks(data.latestPicks)
      return
    }

    if (findNewPick(data.latestPicks, latestPicks)) {
      setLatestPicks(data.latestPicks)
      set({
        opacity: 1,
        x: 0,
      })
    }
  }, [data, latestPicks, set])

  const handleClick = useCallback(() => {
    if (data?.latestPicks[0]?.type) {
      push(`/${data?.latestPicks[0]?.type}`)
    }
    set(initialStyle)
  }, [data, set, push])

  if (error || loading) return null

  return (
    <Container onClick={handleClick} style={style}>
      <span role="img" aria-label={data?.latestPicks[0]?.character}>
        {data?.latestPicks[0]?.character}
      </span>
      <div>
        <div>new emoji</div>
        <div>of the {data?.latestPicks[0]?.type}!</div>
      </div>
    </Container>
  )
}
