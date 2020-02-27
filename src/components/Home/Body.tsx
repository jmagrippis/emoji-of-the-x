import React, { useCallback } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import Hero from './Hero'
import { theme } from '../theme'
import { SlideDirection } from '../../types'
import { EmojisQuery } from '../../generated/graphql'

const Container = styled.main`
  flex: 1 0;
  align-self: normal;
  display: flex;
  align-items: center;
  overflow: hidden;
`
const ArrowContainer = styled.div`
  flex-basis: 4rem;
  color: ${theme.colors.green[200]};
  transition: color 0.4s ${theme.easing};

  &:hover {
    color: ${theme.colors.green[300]};
  }

  a {
    display: block;
  }
`

type Props = {
  emojis?: EmojisQuery['emojis'] | null
}

const getPreviousCurrentNext = (
  emojis?: EmojisQuery['emojis'] | null,
  routeAnchor?: string | null
) => {
  const currentIndex = routeAnchor
    ? emojis?.findIndex(({ anchor }) => anchor === routeAnchor)
    : 0

  return {
    previous:
      emojis && currentIndex !== undefined ? emojis[currentIndex + 1] : null,
    current: emojis && currentIndex !== undefined ? emojis[currentIndex] : null,
    next:
      emojis && currentIndex !== undefined ? emojis[currentIndex - 1] : null,
  }
}

export const Body = ({ emojis }: Props) => {
  const { year, month, day } = useParams()
  const { push } = useHistory()

  const { previous, current, next } = getPreviousCurrentNext(
    emojis,
    day && month && year ? `${year}/${month}/${day}` : null
  )

  const previousLink = previous && `/day/${previous.anchor}`
  const nextLink = next && `/day/${next.anchor}`

  const handleSlide = useCallback(
    (direction: SlideDirection) => {
      console.log({ previousLink, nextLink })
      if (previousLink && direction === SlideDirection.Left) {
        push(previousLink)
        return true
      }

      if (nextLink && direction === SlideDirection.Right) {
        push(nextLink)
        return true
      }
      return false
    },
    [previousLink, nextLink, push]
  )

  return (
    <Container>
      <ArrowContainer>
        {previousLink && (
          <Link to={previousLink}>
            <ArrowBack width="4rem" />
          </Link>
        )}
      </ArrowContainer>
      {current ? (
        <Hero id={current?.id} type={current?.type} handleSlide={handleSlide} />
      ) : null}
      <ArrowContainer>
        {nextLink && (
          <Link to={nextLink}>
            <ArrowForward width="4rem" />
          </Link>
        )}
      </ArrowContainer>
    </Container>
  )
}

export default Body
