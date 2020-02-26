import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styled from 'styled-components'

import { Emoji } from '../../types'

const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const Container = styled.div`
  flex: 1 0;
  align-self: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroEmoji = styled.span`
  font-size: 9rem;
  margin-bottom: 2rem;
`

const HeroName = styled.div`
  font-size: 1.25rem;
  text-align: center;
`

const Animated = styled(animated.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: none;
  user-select: none;
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
  const vh = getViewportHeight()
  const xBoundary = vw / 3

  const [justSlid, setJustSlid] = useState(false)

  const [style, set] = useSpring(() => ({
    x: 0,
    y: Math.floor(vh / 3),
    opacity: 0,
  }))
  const bind = useDrag(
    ({ down, movement: [mx], cancel }) => {
      if (!justSlid && vw / 3 - Math.abs(mx) < 0) {
        handleSlide(mx < 0 ? SlideDirection.Left : SlideDirection.Right)
        setJustSlid(true)
        cancel && cancel()
        set({ opacity: 0, x: 0, y: Math.floor(vh / 3), immediate: true })
        return
      }

      set({ x: down ? mx : 0, opacity: 1 - (3 * Math.abs(mx)) / vw })
    },
    {
      bounds: { left: -xBoundary, right: xBoundary },
      rubberband: true,
      axis: 'x',
    }
  )

  useEffect(() => {
    set({ opacity: 1, y: 0 })
    if (justSlid) {
      setJustSlid(false)
    }
  }, [justSlid, emoji, set])

  return (
    <Container>
      {emoji && (
        <Animated {...bind()} style={style}>
          <HeroEmoji role="img" aria-labelledby="emoji-of-the-week-name">
            {emoji.character}
          </HeroEmoji>
          <HeroName id="emoji-of-the-week-name">“{emoji.name}”</HeroName>
        </Animated>
      )}
    </Container>
  )
}
