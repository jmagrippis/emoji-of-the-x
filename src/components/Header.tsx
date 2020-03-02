import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from './theme'
import { EmojiType } from '../generated/graphql'

const Container = styled.header`
  align-self: normal;
  display: flex;
  align-items: center;
  padding: 1.25rem 0.5rem;
  background-color: ${theme.colors.green[300]};
  font-size: 1.25rem;

  h1,
  nav {
    margin-top: 4px;
  }
`

const Crown = styled.span`
  padding-right: 0.5rem;
`

const Nav = styled.nav`
  padding: 0 1rem;
`

const StyledLink = styled(Link)`
  color: ${theme.colors.green[900]};
  margin: 0 0.125rem;
`

export const Header = () => {
  const match = useRouteMatch<{ type: string }>('/:type')
  const type = match ? match.params.type : EmojiType.Day

  return (
    <Container>
      <Link to="/">
        <Crown role="img" aria-label="the emoji crown">
          {/* // eslint-disable-next-line this IS an accessible span! */}
          👑
        </Crown>
      </Link>
      <h1>Emoji of the...</h1>
      <Nav>
        <StyledLink to="/">
          {!type || type === EmojiType.Day ? <strong>day</strong> : 'day'}
        </StyledLink>
        /
        <StyledLink to="/week">
          {type === EmojiType.Week ? <strong>week</strong> : 'week'}
        </StyledLink>
        /
        <StyledLink to="/month">
          {type === EmojiType.Month ? <strong>month</strong> : 'month'}
        </StyledLink>
      </Nav>
    </Container>
  )
}
