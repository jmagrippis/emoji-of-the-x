import ApolloClient, {
  InMemoryCache,
  defaultDataIdFromObject,
} from 'apollo-boost'
import { Emoji } from './generated/graphql'

const isEmoji = (object: any): object is Emoji => object.id && object.type

const cache = new InMemoryCache({
  dataIdFromObject: (object) =>
    isEmoji(object)
      ? `${object.id}-${object.type}`
      : defaultDataIdFromObject(object),
})

export const apolloClient = new ApolloClient({
  cache,
  uri: 'https://graphql.emoji-of.com',
})
