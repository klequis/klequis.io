import React from "react"
import { rhythm } from "../utils/typography"
import { Link } from 'gatsby'
import BlockQuote from './block-quote'

const blockQuoteStyle = {
	borderLeft: '0.54375rem solid #1ca086',
	borderLeftColor: 'inherit',
	color: 'inherit',
	fontSize: '1.1487rem',
	fontStyle: 'italic',
	lineHeight: '1.45rem',
	marginBottom: rhythm(2),
	marginLeft: 0,
	marginRight: 0,
    marginTop: rhythm(3),
	opacity: 0.8,
	paddingBottom: 0,
	paddingLeft: '0.90625rem',
	paddingRight: 0,
	paddingTop: 0,
}

function PartOfBook() {
  return (
    <BlockQuote>
        <p>This article is <Link to='/full-stack-mern-development-series'>part of a series of articles</Link> on full-stack MERN (MongoDB, Express, React & Node) development. For the full series see <Link to='/full-stack-mern-development-series'>Full-stack Mern Development</Link>.</p>
    </BlockQuote>
  )
}


export default PartOfBook
