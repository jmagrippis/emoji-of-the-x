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
  type: EmojiType
}

export enum EmojiType {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export type Query = {
  __typename?: 'Query'
  trio: Trio
}

export type QueryTrioArgs = {
  anchor?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type Trio = {
  __typename?: 'Trio'
  current: Emoji
  previous?: Maybe<Emoji>
  next?: Maybe<Emoji>
}

export type TrioQueryVariables = {
  anchor?: Maybe<Scalars['String']>
}

export type TrioQuery = { __typename?: 'Query' } & {
  trio: { __typename?: 'Trio' } & {
    current: { __typename?: 'Emoji' } & Pick<
      Emoji,
      'id' | 'character' | 'name' | 'created_at'
    >
    next: Maybe<
      { __typename?: 'Emoji' } & Pick<
        Emoji,
        'id' | 'character' | 'name' | 'created_at'
      >
    >
    previous: Maybe<
      { __typename?: 'Emoji' } & Pick<
        Emoji,
        'id' | 'character' | 'name' | 'created_at'
      >
    >
  }
}
