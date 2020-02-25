import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from './theme'

const Container = styled.header`
  align-self: normal;
  display: flex;
  align-items: center;
  padding: 1.25rem 1rem;
  background-color: ${theme.colors.green[300]};
  font-size: 1.25rem;
`

const Crown = styled.span`
  padding: 0 1rem 0.25rem 0;
`

const Nav = styled.nav`
  padding: 0 1rem;
`

const StyledLink = styled(Link)`
  color: ${theme.colors.green[900]};
`

export const Header = () => (
  <Container>
    <Crown role="img" aria-label="the emoji crown">
      {/* // eslint-disable-next-line the above is a span! */}
      👑
    </Crown>
    <div>Emoji of the</div>
    <Nav>
      <StyledLink to="/">
        <strong>day</strong>
      </StyledLink>
    </Nav>
  </Container>
)
