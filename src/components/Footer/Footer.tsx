import * as React from 'react'
import styled from 'styled-components'

import { ReactComponent as Twitter } from './twitter.svg'
import { theme } from '../theme'

const Container = styled.footer`
  padding: 0.25rem;
  display: flex;
  align-items: center;
`

const Socials = styled.div`
  padding: 0.125rem 0.25rem 0;

  a {
    display: block;
    color: ${theme.colors.green[700]};
  }
`

export const Footer = () => (
  <Container>
    <div>
      made with{' '}
      <span role="img" aria-label="love">
        🧡
      </span>{' '}
      in London -{' '}
    </div>
    <Socials>
      <a
        href="https://twitter.com/emoji_of_the"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter width="1.5rem" />
      </a>
    </Socials>
  </Container>
)
