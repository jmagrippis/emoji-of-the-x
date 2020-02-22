import * as React from 'react'
import Head from 'next/head'

type Props = {
  title: string
  description: string
}

export const Meta = ({ title, description }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=Alef&display=swap"
        rel="stylesheet"
      ></link>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
    </Head>
  </>
)

Meta.defaultProps = {
  title: '👑 Emoji of the Day',
  description:
    'The first app to decide the emoji of the Day / Week / Month / Year 👑',
}
