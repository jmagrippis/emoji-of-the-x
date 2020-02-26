import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Emoji } from '../../types'

import { theme } from '../theme'

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

const Container = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 1s ${theme.easing};
`

const HeroEmoji = styled.span`
  font-size: 9rem;
  margin-bottom: 2rem;
`

const HeroName = styled.div`
  font-size: 1.25rem;
`

type Props = {
  emoji: Emoji | null | undefined
}

export const Hero = ({ emoji }: Props) => (
  <Container>
    {emoji && (
      <>
        <HeroEmoji role="img" aria-labelledby="emoji-of-the-week-name">
          {emoji.character}
        </HeroEmoji>
        <HeroName id="emoji-of-the-week-name">“{emoji.name}”</HeroName>
      </>
    )}
  </Container>
)
