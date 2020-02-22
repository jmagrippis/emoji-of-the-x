import React from 'react'
import fetch from 'isomorphic-unfetch'

import { Body } from './Body'
import { Meta } from '../Meta'
import { API } from '../constants'
import { Emoji } from '../types'

const Home = ({ character, name }: Emoji) => (
  <>
    <Meta title={`${character} is the emoji of the day - ${name}`} />
    <Body character={character} name={name} />
  </>
)

Home.getInitialProps = async () => {
  const res = await fetch(`${API}/day`)
  const emoji = await res.json()

  return {
    ...emoji,
  }
}

export default Home
