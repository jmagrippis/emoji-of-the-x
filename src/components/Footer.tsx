import * as React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  padding: 0.25rem;
`

export const Footer = () => (
  <Container>
    made with{' '}
    <span role="img" aria-label="love">
      🧡
    </span>{' '}
    in London
  </Container>
)
