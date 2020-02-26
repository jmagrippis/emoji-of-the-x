import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import { Hero } from './Hero'
import { theme } from '../theme'
import { Emoji } from '../../types'

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
    <Hero emoji={current} />
    <ArrowContainer>
      {next && (
        <Link to={next ? getDaySlug(new Date(parseInt(next.created_at))) : '/'}>
          <ArrowForward width="4rem" />
        </Link>
      )}
    </ArrowContainer>
  </Container>
)
