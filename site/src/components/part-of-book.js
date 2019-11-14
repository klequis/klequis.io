import React from 'react'
import { Link } from 'gatsby'
import BlockQuote from './block-quote'

function PartOfBook() {
  return (
    <BlockQuote marginTopRhythm={2} marginBottomRhythm={3}>
      <p>
        This article is{' '}
        <Link to="/full-stack-mern-development-series">
          part of a series of articles
        </Link>{' '}
        on full-stack MERN (MongoDB, Express, React & Node) development. For the
        full series see{' '}
        <Link to="/full-stack-mern-development-series">
          Full-stack Mern Development
        </Link>
        .
      </p>
    </BlockQuote>
  )
}

export default PartOfBook
