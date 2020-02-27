import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import { Hero } from './Hero'
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
  current?: EmojisQuery['emojis'][0] | null
  previous?: EmojisQuery['emojis'][0] | null
  next?: EmojisQuery['emojis'][0] | null
}

export const Body = ({ current, previous, next }: Props) => {
  const { push } = useHistory()
  const previousLink = previous ? `/day/${previous.anchor}` : undefined
  const nextLink = next ? `/day/${next.anchor}` : undefined

  const handleSlide = useCallback(
    (direction: SlideDirection) => {
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
