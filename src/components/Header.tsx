import React from 'react'
import { Link, useParams } from 'react-router-dom'
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
  margin: 0 0.125rem;
`

export const Header = () => {
  const { type } = useParams()
  return (
    <Container>
      <Crown role="img" aria-label="the emoji crown">
        {/* // eslint-disable-next-line this IS an accessible span! */}
        👑
      </Crown>
      <div>Emoji of the...</div>
      <Nav>
        <StyledLink to="/">
          {!type || type === 'day' ? <strong>day</strong> : 'day'}
        </StyledLink>
        /
        <StyledLink to="/week">
          {type === 'week' ? <strong>week</strong> : 'week'}
        </StyledLink>
        /
        <StyledLink to="/month">
          {type === 'month' ? <strong>month</strong> : 'month'}
        </StyledLink>
      </Nav>
    </Container>
  )
}
