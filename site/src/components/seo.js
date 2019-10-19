/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, ogImage, ogUrl, ogType, ogPublishedTime, ogModified }) {
  console.log('SEO:ogtype', ogType)
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )



  const metaDescription = description || site.siteMetadata.description
  // console.log('title', title)
  // console.log('ogPublishedTime', ogPublishedTime)
  // const publishedTime = ogPublishedTime ? new Date(ogPublishedTime).toISOString() : ''


  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      // image={image}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `og:site_name`,
          content: "klequis' blog"
        },
        {
          name: `og:article:published_time`,
          content: ogPublishedTime
        },
        {
          name: `og:article:modified_time`,
          content: new Date(ogModified).toISOString
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: ogUrl,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        // assums that if type is not specified it is the home page
        {
          property: `og:type`,
          content: ogType || `website`,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:image:width`,
          content: "590",
        },
        {
          property: `og:image:height`,
          content: "286",
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  ogimage: 'none'
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
