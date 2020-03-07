import React, { useCallback } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import { ReactComponent as ArrowForward } from './arrow_forward.svg'
import Hero from './Hero'
import { AboutButton } from './AboutButton'
import { Toast } from './Toast'
import { theme } from '../theme'
import { trackEvent, Action } from '../useTracking'
import { SlideDirection } from '../../types'
import { EmojisQuery, EmojiType } from '../../generated/graphql'

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
  emojis?: EmojisQuery['emojis'] | null
}

type Params = {
  day?: string
  month?: string
  year?: string
  week?: string
}

const getCurrentIndexAndType = (
  emojis: EmojisQuery['emojis'] | null | undefined,
  { day, month, year, week }: Params
) => {
  const type = emojis ? emojis[0].type : EmojiType.Day

  switch (type) {
    case EmojiType.Day: {
      const routeAnchor =
        day && month && year ? `${year}/${month}/${day}` : null
      const currentIndex = routeAnchor
        ? emojis?.findIndex(({ anchor }) => anchor === routeAnchor)
        : 0

      return { type, currentIndex }
    }
    case EmojiType.Month: {
      const routeAnchor = month && year ? `${year}/${month}` : null
      const currentIndex = routeAnchor
        ? emojis?.findIndex(({ anchor }) => anchor === routeAnchor)
        : 0

      return { type, currentIndex }
    }
    case EmojiType.Week: {
      const routeAnchor = week && year ? `${year}/${week}` : null
      const currentIndex = routeAnchor
        ? emojis?.findIndex(({ anchor }) => anchor === routeAnchor)
        : 0

      return { type, currentIndex }
    }
    default:
      return {
        type,
        currentIndex: 0,
      }
  }
}
const parseParams = (
  emojis: EmojisQuery['emojis'] | null | undefined,
  params: Params
) => {
  const { currentIndex, type } = getCurrentIndexAndType(emojis, params)

  const previous =
    emojis && currentIndex !== undefined ? emojis[currentIndex + 1] : null
  const current =
    emojis && currentIndex !== undefined ? emojis[currentIndex] : null
  const next =
    emojis && currentIndex !== undefined ? emojis[currentIndex - 1] : null

  const previousLink = previous && `/${type}/${previous.anchor}`
  const nextLink = next && `/${type}/${next.anchor}`

  return {
    current,
    previousLink,
    nextLink,
  }
}

export const Body = ({ emojis }: Props) => {
  const params = useParams<Params>()
  const { push } = useHistory()

  const { current, previousLink, nextLink } = parseParams(emojis, params)

  const handleSlide = useCallback(
    (direction: SlideDirection) => {
      switch (direction) {
        case SlideDirection.Left:
          if (previousLink) {
            push(previousLink)
            trackEvent(Action.Swipe, {
              event_category: 'engagement',
              event_label: 'navigation',
              value: 1,
            })
            return true
          }
          trackEvent(Action.SwipeToNowhere, {
            event_category: 'engagement',
            event_label: 'navigation',
            value: 1,
          })
          return false
        case SlideDirection.Right:
          if (nextLink) {
            push(nextLink)
            trackEvent(Action.Swipe, {
              event_category: 'engagement',
              event_label: 'navigation',
              value: 2,
            })
            return true
          }
          trackEvent(Action.SwipeToNowhere, {
            event_category: 'engagement',
            event_label: 'navigation',
            value: 2,
          })
          return false
        default:
          return false
      }
    },
    [previousLink, nextLink, push]
  )

  return (
    <>
      <Container>
        <ArrowContainer>
          {previousLink && (
            <Link to={previousLink}>
              <ArrowBack width="4rem" aria-label="previous emoji" />
            </Link>
          )}
        </ArrowContainer>
        {current ? (
          <Hero
            id={current?.id}
            type={current?.type}
            handleSlide={handleSlide}
          />
        ) : null}
        <ArrowContainer>
          {nextLink && (
            <Link to={nextLink}>
              <ArrowForward width="4rem" aria-label="next emoji" />
            </Link>
          )}
        </ArrowContainer>
        <AboutButton />
      </Container>
      <Toast />
    </>
  )
}

export default Body
