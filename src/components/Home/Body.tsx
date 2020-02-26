import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import { Hero, SlideDirection } from './Hero'
import { theme } from '../theme'
import { Emoji } from '../../types'

const getDaySlug = (date: Date) =>
  `/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

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
  current?: Emoji | null
  previous?: Emoji | null
  next?: Emoji | null
}

export const Body = ({ current, previous, next }: Props) => {
  const { push } = useHistory()
  const previousLink = previous
    ? getDaySlug(new Date(parseInt(previous.created_at)))
    : undefined
  const nextLink = next
    ? getDaySlug(new Date(parseInt(next.created_at)))
    : undefined

  const handleSlide = useCallback(
    (direction: SlideDirection) => {
      if (previousLink && direction === SlideDirection.Left) {
        push(previousLink)
      }

      if (nextLink && direction === SlideDirection.Right) {
        push(nextLink)
      }
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
      <Hero emoji={current} handleSlide={handleSlide} />
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
