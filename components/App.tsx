import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppProps } from 'next/app'

import { Header } from './Header'
import { Footer } from './Footer'
import { apolloClient } from '../src/apolloClient'

export const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={apolloClient}>
    <div className="w-full flex flex-grow flex-col items-center justify-between">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  </ApolloProvider>
)
