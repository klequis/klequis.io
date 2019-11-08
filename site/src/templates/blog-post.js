import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import PartOfBook from "../components/part-of-book"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const href = this.props.location.href
    const { previous, next } = this.props.pageContext

    const publishedDate = new Date(post.frontmatter.publishedDate).toISOString()
    const modDate = post.frontmatter.modifiedDate
    const modifiedDate =
      modDate.toLowerCase() !== "invalid date"
        ? new Date(modDate).toISOString()
        : ""
    // const partOfBookRaw = post.frontmatter.partOfBook
    // console.log('partOfBookRaw', partOfBookRaw);

    const partOfBook = post.frontmatter.partOfBook ? true : false
    console.log("post", post)

    console.log("partOfBook", partOfBook)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          article={true}
          slug={post.frontmatter.slug}
          description={post.frontmatter.description || post.excerpt}
          pageType="article"
          pageUrl={href}
          previewImage={post.frontmatter.previewImage}
          modifiedDate={modifiedDate}
          publishedDate={publishedDate}
          title={post.frontmatter.title}
        />

        <div>
          {partOfBook ? <PartOfBook /> : null}
        </div>

        <h1>{post.frontmatter.title}</h1>

        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.publishedDate}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        slug
        description
        modifiedDate(formatString: "MMMM DD, YYYY")
        partOfBook
        previewImage
        publishedDate(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
