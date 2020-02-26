import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import styled from 'styled-components'

import './app.css'
import { Header } from './Header'
import { Footer } from './Footer'
import Home from './Home/Home'
import { apolloClient } from '../apolloClient'

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Container>
        <Header />
        <Route path={['/', '/day/:year/:month/:day']} exact>
          <Home />
        </Route>
        <Footer />
      </Container>
    </BrowserRouter>
  </ApolloProvider>
)
