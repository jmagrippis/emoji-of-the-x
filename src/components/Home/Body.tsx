import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import { theme } from '../theme'

const getDaySlug = (date: Date) =>
  `/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

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
`

const HeroEmoji = styled.span`
  font-size: 9rem;
  margin-bottom: 2rem;
`

const HeroName = styled.div`
  font-size: 1.25rem;
`

export const Body = ({ current, previous, next }: any) => (
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
