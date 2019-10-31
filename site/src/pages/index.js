import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import isDate from "date-fns/isDate"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug

          // If the date in the article's frontmatter is not valid such as ''
          // GraphQL will return 'Invalid date' and date-fns/isDate will return
          // true if you do isDate(new Date(modifiedDate)) where modifiedDate = 'Invalid Date'
          const modifiedDate = node.frontmatter.modifiedDate

          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.publishedDate}
                {// see note above
                isDate(new Date(modifiedDate)) &&
                modifiedDate !== "Invalid date"
                  ? ` - updated: ${modifiedDate}`
                  : ""}
              </small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___publishedDate], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            publishedDate(formatString: "MMMM DD, YYYY")
            modifiedDate(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
