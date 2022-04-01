import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import styles from './index.module.css'

const BlogIndex = (props) => {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const [list, setList] = useState([])
  if (typeof window !== 'undefined') {
    var hm = document.createElement("script");
    hm.src = "https://s9.cnzz.com/z_stat.php?id=1278835659&web_id=1278835659";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  }
  const [page, setPage] = useState(0)
  const length = 5
  useEffect(() => {
    console.log(props)
    setList(posts.slice(page * length, (page + 1) * length))
  }, [page])
  const renderPage = () => {
    return (
      <>
        {list.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </>
    )

  }

  const renderPaging = () => {
    let totalPage = Math.ceil(posts.length / length)
    console.log('totalPage', totalPage)
    let arr = []
    for (let i = 0; i < totalPage; i++) {
      arr.push(i)
    }
    return (
      <div className={styles.pagingBox}>
        <div
          onClick={() => setPage(0)}
          className={styles.pagingItem}>首页</div>
        <div
          onClick={() => {
            if (page <= 0) return
            setPage(page - 1)
          }}
          className={styles.pagingItem}>上一页</div>
        {arr.map((item, index) => {
          if (index <= 5) {
            return (
              <div
                key={index}
                className={`${styles.pagingItem} ${page === index && styles.pagingActive}`}
                onClick={() => setPage(index)}>
                {index + 1}
              </div>
            )
          } else if (totalPage - index < 3) {
            return (
              <div
                key={index}
                className={`${styles.pagingItem} ${page === index && styles.pagingActive}`}
                onClick={() => setPage(index)}>
                {index + 1}
              </div>
            )
          } else if (page === index) {
            return (
              <div
                key={index}
                className={`${styles.pagingItem} ${page === index && styles.pagingActive}`}
                onClick={() => setPage(index)}>
                {index + 1}
              </div>
            )
          } else if (page + 1 === index || index === 6) {
            return <div style={{ lineHeight: '2rem' }}>...</div>
          } else {
            return null
          }
        })}
        <div
          onClick={() => {
            if (totalPage <= page + 1) return
            setPage(page + 1)
          }}
          className={styles.pagingItem}>下一页</div>
      </div>
    )
  }
  return (
    <Layout location={location} title={siteTitle}>
      {/* <SEO title="M ~" /> */}
      {renderPage()}
      {renderPaging()}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
