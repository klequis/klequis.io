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

const SEO = ({
  article = false,
  description,
  lang,
  meta,
  modifiedDate,
  pageUrl,
  previewImage,
  publishedDate,
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  
  const ogUrl = pageUrl || site.siteMetadata.siteUrl
  
  
  const commonMeta = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: `og:site_name`,
      content: "klequis' blog",
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      // assumes that if type is not specified it is the home page
      property: `og:type`,
      content: article ? "article" : `website`,
    },
    {
      property: `og:url`,
      content: ogUrl,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: `at_klequis`,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `twitter:title`,
      content: title,
    },
  ]

  const articleMeta = [
    {
      name: `og:article:author`,
      content: `Carl Becker (klequis)`,
    },
    {
      name: `og:article:published_time`,
      content: publishedDate,
    },
    {
      name: `og:article:modified_time`,
      content: modifiedDate,
    },

    {
      property: `og:image`,
      content: previewImage,
    },
    {
      property: `og:image:height`,
      content: "286",
    },
    {
      property: `og:image:width`,
      content: "590",
    },
  ]

  const allMeta = article ? [...commonMeta, ...articleMeta] :  [...commonMeta]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={allMeta.concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  ogimage: "none",
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
