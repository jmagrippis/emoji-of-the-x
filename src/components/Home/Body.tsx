import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import { theme } from '../theme'
import { Emoji } from '../../types'

const getDaySlug = (date: Date) =>
  `/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50vh, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const Container = styled.main`
  flex: 1 0;
  align-self: normal;
  display: flex;
  align-items: center;
`
const ArrowContainer = styled.div`
  flex-basis: 4rem;
  color: ${theme.colors.green[200]};
`

const Hero = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1);
`

const HeroEmoji = styled.span`
  font-size: 9rem;
  margin-bottom: 2rem;
`

const HeroName = styled.div`
  font-size: 1.25rem;
`

type Props = {
  current?: Emoji | null
  previous?: Emoji | null
  next?: Emoji | null
}

export const Body = ({ current, previous, next }: Props) => (
  <Container>
    <ArrowContainer>
      {previous && (
        <Link
          to={
            previous ? getDaySlug(new Date(parseInt(previous.created_at))) : '/'
          }
        >
          <ArrowBack width="4rem" />
        </Link>
      )}
    </ArrowContainer>
    <Hero>
      {current && (
        <>
          <HeroEmoji role="img" aria-labelledby="emoji-of-the-week-name">
            {current.character}
          </HeroEmoji>
          <HeroName id="emoji-of-the-week-name">“{current.name}”</HeroName>
        </>
      )}
    </Hero>
    <ArrowContainer>
      {next && (
        <Link to={next ? getDaySlug(new Date(parseInt(next.created_at))) : '/'}>
          <ArrowForward width="4rem" />
        </Link>
      )}
    </ArrowContainer>
  </Container>
)
