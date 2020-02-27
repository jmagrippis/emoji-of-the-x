import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useHover } from 'react-use-gesture'
import styled from 'styled-components'

import { theme } from '../theme'

const Container = styled(animated.a)`
  position: absolute;
  color: ${theme.colors.gray[100]};
  background-color: ${theme.colors.green[400]};
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 100%;
  bottom: 0.25rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  box-shadow: ${theme.shadows.md};
`
const initialStyle = { y: 0 }

export const AboutButton = () => {
  const [style, set] = useSpring(() => initialStyle)
  const bind = useHover(({ active }) => {
    set(active ? { y: -10 } : initialStyle)
  })
  const { push } = useHistory()

  const onClick = useCallback(() => {
    push('/about')
  }, [push])

  return (
    <Container {...bind()} style={style} onClick={onClick}>
      <span>?</span>
    </Container>
  )
}
