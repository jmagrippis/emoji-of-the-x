import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  uri: 'https://emoji-of-the-x-scraper.herokuapp.com',
})
