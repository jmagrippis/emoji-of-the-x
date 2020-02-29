export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Emoji = {
  __typename?: 'Emoji'
  id: Scalars['ID']
  character: Scalars['String']
  name: Scalars['String']
  created_at: Scalars['String']
  anchor: Scalars['String']
  type: EmojiType
}

export enum EmojiType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

export type Query = {
  __typename?: 'Query'
  emoji?: Maybe<Emoji>
  emojis: Array<Emoji>
  latestPicks: Array<Emoji>
  hashtags: Array<Scalars['String']>
}

export type QueryEmojiArgs = {
  id: Scalars['ID']
  type: EmojiType
}

export type QueryEmojisArgs = {
  anchor?: Maybe<Scalars['String']>
  type: EmojiType
}

export type HashtagsQueryVariables = {}

export type HashtagsQuery = { __typename?: 'Query' } & Pick<Query, 'hashtags'>

export type EmojiQueryVariables = {
  id: Scalars['ID']
  type: EmojiType
}

export type EmojiQuery = { __typename?: 'Query' } & {
  emoji: Maybe<
    { __typename?: 'Emoji' } & Pick<
      Emoji,
      'id' | 'type' | 'character' | 'name' | 'created_at'
    >
  >
}

export type EmojisQueryVariables = {
  type: EmojiType
}

export type EmojisQuery = { __typename?: 'Query' } & {
  emojis: Array<
    { __typename?: 'Emoji' } & Pick<Emoji, 'id' | 'type' | 'anchor'>
  >
}

export type LatestPicksQueryVariables = {}

export type LatestPicksQuery = { __typename?: 'Query' } & {
  latestPicks: Array<
    { __typename?: 'Emoji' } & Pick<Emoji, 'id' | 'type' | 'character' | 'name'>
  >
}
