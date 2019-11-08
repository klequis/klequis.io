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
  ...rest
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

  console.log('**** og:url hard coded : rev-2 ****');

  const metaDescription = description || site.siteMetadata.description
  // const hasFinalSlash = st
  // const pageUrlNoFinalSlash = 
  // console.log('pageUrl', pageUrl);
  // console.log('lastChar', pageUrl[pageUrl.length - 1] === '/')
  
  let pageUrlNoFinalSlash
  if (pageUrl !== undefined) {
    pageUrlNoFinalSlash = pageUrl.substring(0, pageUrl.length - 1)
  }
  
  console.log('pageUrlNoFinalSlash', pageUrlNoFinalSlash);
  
  
  const ogUrl = pageUrlNoFinalSlash || site.siteMetadata.siteUrl
  
  
  
  console.log('ogUrl', ogUrl);
  

  const commonMeta = [
    // {
    //   property: `fb:app_id`,
    //   content: "495377417716964",
    // },
    {
      name: `description`,
      content: metaDescription,
    },
    // {
    //   property: `og:site_name`,
    //   content: "klequis' blog",
    // },
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
    // {
    //   name: `twitter:card`,
    //   content: `summary_large_image`,
    // },
    // {
    //   name: `twitter:creator`,
    //   content: `at_klequis`,
    // },
    // {
    //   name: `twitter:description`,
    //   content: metaDescription,
    // },
    // {
    //   name: `twitter:title`,
    //   content: title,
    // },
  ]

  const articleMeta = [
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
    // {
    //   name: `og:article:author`,
    //   content: `Carl Becker (klequis)`,
    // },
    // {
    //   name: `og:article:published_time`,
    //   content: publishedDate,
    // },
    // {
    //   name: `og:article:modified_time`,
    //   content: modifiedDate,
    // },
  ]

  const allMeta = article ? [...articleMeta, ...commonMeta] : [...commonMeta]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[{ rel: "canonical", key: ogUrl, href: ogUrl }]}
      // meta={allMeta.concat(meta)}
      meta={[
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
        {
          name: `description`,
          content: metaDescription,
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
          // content: ogUrl,
          content: `https://klequis.io/ubuntu-vm-virtualbox`
        },
      ]}
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
