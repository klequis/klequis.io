import React from "react"
import Image from "gatsby-image"
import { rhythm } from "../utils/typography"

const blockQuoteStyle = {
	marginLeft: 0,
	marginRight: 0,
	marginTop: 0,
	paddingBottom: 0,
	paddingLeft: '0.90625rem',
	paddingRight: 0,
	paddingTop: 0,
	marginBottom: '1.45rem',
	fontSize: '1.1487rem',
	lineHeight: '1.45rem',
	borderLeft: '0.54375rem solid #1ca086',
	color: 'inherit',
	fontStyle: 'italic',
	borderLeftColor: 'inherit',
	opacity: 0.8,
}

function PartOfBook() {
  return (
    <div style={blockQuoteStyle}>
        <p>This article is <a src='https://klequis.io/full-stack-mern-development-series'>part of a series of articles</a> on full-stack MERN (MongoDB, Express, React & Node) development. For the full series see <a src='https://klequis.io/full-stack-mern-development-series'>Full-stack Mern Development</a>.</p>
    </div>
  )
}


export default PartOfBook
