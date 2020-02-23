import React from 'react'

import { Body } from './Body'
import { Meta } from '../Meta'
import { Trio, getTrio } from '../../src/getTrio'

type Props = Trio

const Home = ({ previous, current, next }: Props) => (
  <>
    <Meta
      title={`${current.character} is the emoji of the day - ${current.name}`}
    />
    <Body previous={previous} current={current} next={next} />
  </>
)

Home.getInitialProps = ({ query: { anchorParts } }) =>
  getTrio(
    anchorParts && Array.isArray(anchorParts) ? anchorParts.join('/') : null
  )

export default Home
