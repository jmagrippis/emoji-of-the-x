import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Hashtags } from './Hashtags'
import { theme } from '../theme'

const Container = styled.h2`
  max-width: 768px;
  line-height: 1.3;
  padding: 2rem 1rem 1rem;

  section {
    padding-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  a {
    color: ${theme.colors.green[700]};
  }
`

export const About = () => (
  <>
    <Helmet>
      <title>About - Emoji of the day / week / month</title>
    </Helmet>
    <Container>
      <section>
        <h2>> What’s this then?</h2>
        <div>
          <p>
            Emojis! So hot right now{' '}
            <span role="img" aria-label="so hot">
              🔥
            </span>{' '}
          </p>

          <p>
            Sites such as <a href="https://emojipedia.org/">Emojipedia</a> are
            invaluable sources of knowledge in an emoji-loving world, but did
            you know before this app, there was no resource to pick its official
            emoji of the day? Or of the week? Or of the month? What a world we
            lived in!
          </p>

          <p>
            I only realised after watching entertainer{' '}
            <a href="https://www.instagram.com/kevinbparry/?hl=en">
              Kevin Parry
            </a>{' '}
            publish videos based on a specific emoji every month. I was fresh
            coming off a weekly photography challenge I did for over a year, so
            I thought:
          </p>
          <p>
            "huh, wouldn’t it be cool if there’s a challenge where your theme /
            constrain / inspiration were an emoji?"
          </p>

          <p>
            I scoured the internet to find such a challenge, to no avail. I then
            figured I should find the emoji of the day and shoot something
            fitting regardless... But...{' '}
            <strong>There was no such a thing as the emoji of the day</strong>{' '}
            <span role="img" aria-label="the horror">
              😱
            </span>
            !
          </p>

          <p>
            So I built it! Hope you like it{' '}
            <span role="img" aria-label="all smiles">
              😁
            </span>
          </p>
        </div>
      </section>

      <section>
        <h2>> Photography challenge you say?</h2>
        <div>
          <p>
            I did have a <strong>weekly photography challenge</strong> in mind
            when the idea came, but don’t let that limit you! Being guided by an
            emoji for <strong>anything</strong> is a fun idea, which is why I
            went with the 3 different types of picks.
          </p>
          <p>
            One month’s lead time might be more appropriate for a cinematography
            challenge, one day might just about fit an Instagram story challenge
            well. It all depends on what type of challenge <strong>you</strong>{' '}
            want!
          </p>
          <p>
            It doesn’t have to be related to “art” in any way. Maybe for you
            it’s a lifestyle hint! Maybe you see the emoji of February being{' '}
            <span role="img" aria-label="love was in the air">
              😚
            </span>{' '}
            and you decide to go all out for Valentine’s this year.
          </p>
          <p>I promise I didn’t do that by the way, it was just chance!</p>
          <p>
            Speaking of, the picks <strong>are</strong> random, and I will not
            be doctoring them! As such, we are bound to end up with some...
            let’s say ”stinkers”. Maybe you can try to see the bright side of
            them, and use them all positively and creatively! Or not, again, use
            this app the way <strong>you</strong> see fit.
          </p>
          <p>
            If you <strong>do</strong> want to go down the photography route,
            how about you try sharing your pictures on the gram? For the current
            picks, you could use:
          </p>
          <Hashtags />
        </div>
      </section>

      <section>
        <h2>> Who are you anyway?</h2>
        <div>
          <p>
            I am Johnny Magrippis, a{' '}
            <a href="https://medium.com/@jmagrippis">software engineer</a> who{' '}
            <a href="https://www.instagram.com/jmagrippis/?hl=en">
              loves photography
            </a>
            .
          </p>
          <p>Nice of you to drop by!</p>
        </div>
      </section>
    </Container>
  </>
)
