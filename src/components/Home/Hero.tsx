import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import styles from './Hero.module.css'
import { ErrorNotice } from '../ErrorNotice'
import { SlideDirection } from '../../types'
import { theme } from '../theme'
import {
  EmojiQuery,
  EmojiQueryVariables,
  EmojiType,
} from '../../generated/graphql'

const EMOJI_QUERY = gql`
  query Emoji($id: ID!, $type: EmojiType!) {
    emoji(id: $id, type: $type) {
      id
      type
      character
      name
      created_at
    }
  }
`

const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

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
  id: string
  type: EmojiType
  handleSlide: (direction: SlideDirection) => boolean
}

export const Hero = ({ id, type, handleSlide }: Props) => {
  const { loading, error, data } = useQuery<EmojiQuery, EmojiQueryVariables>(
    EMOJI_QUERY,
    {
      variables: { id, type },
    }
  )
  const vw = getViewportWidth()
  const vh = getViewportHeight()
  const xBoundary = vw / 3

  const [style, set] = useSpring(() => ({
    x: 0,
    y: Math.floor(vh / 3),
    opacity: 0,
  }))
  const bind = useDrag(
    ({ down, movement: [mx], cancel, dragging }) => {
      if (dragging && vw / 4 - Math.abs(mx) < 0) {
        const shouldReset = handleSlide(
          mx < 0 ? SlideDirection.Left : SlideDirection.Right
        )

        if (shouldReset) {
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
    if (loading) {
      set({ opacity: 0, y: Math.floor(vh / 3), immediate: true })
      return
    } else {
      set({ opacity: 1, y: 0 })
    }
  }, [id, loading, set, vh])

  if (error) {
    return <ErrorNotice />
  }

  return (
    <animated.div className={styles.container} {...bind()} style={style}>
      {!loading && data?.emoji ? (
        <>
          <Helmet>
            <title>
              {data.emoji.character} - emoji of the {data.emoji.type}
            </title>
          </Helmet>
          <HeroEmoji role="img" aria-labelledby="emoji-of-the-week-name">
            {data?.emoji.character}
          </HeroEmoji>
          <HeroName id="emoji-of-the-week-name">“{data?.emoji.name}”</HeroName>
          <HeroDate>
            emoji of{' '}
            {new Date(parseInt(data?.emoji.created_at)).toLocaleDateString()}
          </HeroDate>
        </>
      ) : null}
    </animated.div>
  )
}

export default React.memo(Hero)
