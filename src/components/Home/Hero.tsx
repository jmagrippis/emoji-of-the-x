import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styled from 'styled-components'

import { Emoji, SlideDirection } from '../../types'
import { theme } from '../theme'

const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const Container = styled(animated.div)`
  flex: 1 0;
  align-self: stretch;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;
`

const HeroEmoji = styled.span`
  font-size: 9rem;
  margin-bottom: 2rem;
`

const HeroName = styled.div`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 0.5rem;
`

const HeroDate = styled.div`
  color: ${theme.colors.gray[500]};
`

type Props = {
  emoji: Emoji | null | undefined
  handleSlide: (direction: SlideDirection) => boolean
  show: boolean
}

export const Hero = ({ emoji, handleSlide, show }: Props) => {
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
    ({ down, movement: [mx], cancel, dragging }) => {
      if (!justSlid && vw / 4 - Math.abs(mx) < 0) {
        const shouldReset = handleSlide(
          mx < 0 ? SlideDirection.Left : SlideDirection.Right
        )

        if (shouldReset) {
          setJustSlid(true)
          cancel && cancel()
          set({ opacity: 0, x: 0, y: Math.floor(vh / 3), immediate: true })
          return
        }
      }

      set({
        x: down ? mx : 0,
        opacity: dragging ? 1 - (3 * Math.abs(mx)) / vw : 1,
      })
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
    <Container {...bind()} style={style}>
      {show && emoji ? (
        <>
          <HeroEmoji role="img" aria-labelledby="emoji-of-the-week-name">
            {emoji.character}
          </HeroEmoji>
          <HeroName id="emoji-of-the-week-name">“{emoji.name}”</HeroName>
          <HeroDate>
            emoji of {new Date(parseInt(emoji.created_at)).toLocaleDateString()}
          </HeroDate>
        </>
      ) : null}
    </Container>
  )
}
