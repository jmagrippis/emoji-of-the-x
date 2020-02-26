import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styled, { keyframes } from 'styled-components'

import { Emoji } from '../../types'
import { theme } from '../theme'

const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
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
  animation: ${slideIn} 1s ${theme.easing};
  align-self: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const HeroEmoji = styled.span`
  font-size: 9rem;
  margin-bottom: 2rem;
`

const HeroName = styled.div`
  font-size: 1.25rem;
`

const Animated = styled(animated.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export enum SlideDirection {
  Left = 'left',
  Right = 'right',
}

type Props = {
  emoji: Emoji | null | undefined
  handleSlide: (direction: SlideDirection) => void
}

export const Hero = ({ emoji, handleSlide }: Props) => {
  const vw = getViewportWidth()
  const yBoundary = vw / 3

  const [justSlid, setJustSlid] = useState(false)
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ swipe, down, movement: [mx, my] }) => {
      if (!justSlid && vw / 5 - Math.abs(mx) < 0) {
        handleSlide(mx < 0 ? SlideDirection.Left : SlideDirection.Right)
        setJustSlid(true)
      }

      set({ x: down ? mx : 0, y: down ? my : 0 })
    },
    {
      bounds: { left: -yBoundary, right: yBoundary },
      rubberband: true,
    }
  )

  useEffect(() => {
    if (justSlid) {
      setTimeout(() => {
        setJustSlid(false)
      }, 1000)
    }
  }, [justSlid])

  return (
    <Container>
      {emoji && (
        <Animated {...bind()} style={{ x, y }}>
          <HeroEmoji role="img" aria-labelledby="emoji-of-the-week-name">
            {emoji.character}
          </HeroEmoji>
          <HeroName id="emoji-of-the-week-name">“{emoji.name}”</HeroName>
        </Animated>
      )}
    </Container>
  )
}
