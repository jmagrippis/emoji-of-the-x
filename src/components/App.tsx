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
import { useTracking } from './useTracking'

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

export const App = () => {
  useTracking('UA-140091800-2')

  return (
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
            '/day/:year/:month/:day',
            '/week/:year/:week',
            '/month/:year/:month',
          ]}
          exact
        >
          <Home />
        </Route>
      </Switch>
      <Notice />
      <Footer />
    </Container>
  )
}

export default () => (
  <ServiceWorkerProvider>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </ServiceWorkerProvider>
)
