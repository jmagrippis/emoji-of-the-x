import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  fetch,
})
