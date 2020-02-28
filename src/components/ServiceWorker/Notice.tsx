import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'

import { ServiceWorkerContext } from './ServiceWorkerContext'
import { theme } from '../theme'

const Container = styled(animated.button)`
  padding: 1rem 2rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0.5rem;
  border-radius: 0.375rem;
  background-color: ${theme.colors.green[300]};
  z-index: 100;
  max-width: 768px;
  box-shadow: ${theme.shadows.md};

  span {
    font-size: 1.25rem;
    margin: 0 0.5rem;
  }
`

const hiddenStyles = {
  y: 200,
  opacity: 0,
}

const visibleStyles = {
  y: 0,
  opacity: 1,
}

export const Notice = () => {
  const [dismissed, setDismissed] = useState(false)
  const { update, success, registration } = useContext(ServiceWorkerContext)
  const [style, set] = useSpring(() => hiddenStyles)

  useEffect(() => {
    if (success || update) {
      set(visibleStyles)
    }
  }, [success, update, set])

  useEffect(() => {
    if (dismissed) {
      set(hiddenStyles)
    }
  }, [dismissed, set])

  const onClick = useCallback(() => {
    setDismissed(true)
    if (update && registration) {
      registration.waiting?.postMessage('skipWaiting')
      window.location.reload()
    }
  }, [update, registration])

  return style.opacity.getValue() ? (
    <Container onClick={onClick} style={style}>
      {success ? (
        <>
          <span role="img" aria-label="lightning fast">
            ⚡️
          </span>
          We’ve cached some code, so next time we’ll get you the latest emoji
          even quicker
          <span role="img" aria-label="lightning fast">
            ⚡️
          </span>
        </>
      ) : null}
      {update ? (
        <>
          <span role="img" aria-label="tap">
            👊🏼
          </span>
          We have a feature / performance update available, hit here to get it{' '}
          <span role="img" aria-label="tap">
            👊🏼
          </span>
        </>
      ) : null}
    </Container>
  ) : null
}
