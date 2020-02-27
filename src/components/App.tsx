import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import styled from 'styled-components'

import './app.css'
import { ServiceWorkerProvider } from './ServiceWorker/ServiceWorkerProvider'
import { Notice } from './ServiceWorker/Notice'
import { Header } from './Header'
import { Footer } from './Footer'
import Home from './Home/Home'
import { About } from './About/About'
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
  <ServiceWorkerProvider>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Container>
          <Route path={'/:type?'}>
            <Header />
          </Route>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route
              path={[
                '/:type?',
                '/:type/:year/:month/:day',
                '/:type/:year/:month',
                '/:type/:year/:week',
              ]}
              exact
            >
              <Home />
            </Route>
          </Switch>
          <Notice />
          <Footer />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  </ServiceWorkerProvider>
)
