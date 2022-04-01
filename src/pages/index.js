import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

import styles from './index.module.css'
import { Input, Pagination, Select } from "antd"

const BlogIndex = (props) => {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const directories = data.allDirectory.nodes
  const [totalList, setTotalList] = useState([])
  const [list, setList] = useState([])
  if (typeof window !== 'undefined') {
    var hm = document.createElement("script");
    hm.src = "https://s9.cnzz.com/z_stat.php?id=1278835659&web_id=1278835659";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  }
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const pageSize = 7
  useEffect(() => {
    const result = posts.filter(e => {
      return e.node.frontmatter.title.search(search) >= 0 ||
        e.node.frontmatter.description.search(search) >= 0
    })
    setTotalList(result)
  }, [search])
  const [classify, setClassify] = useState('')
  useEffect(() => {
    const result = posts.filter(e => {
      return e.node.parent.relativeDirectory === classify || classify == ''
    })
    setTotalList(result)
  }, [classify])
  useEffect(() => {
    const result = totalList.slice((page - 1) * pageSize, (page) * pageSize)
    setList(result)
  }, [page, totalList])
  const renderSearch = () => {
    return (
      <div className={styles.search_box}>
        <Input
          style={{ width: '300px' }}
          placeholder="搜索"
          onKeyDown={e => {
            console.log(e.target.value)
            if (e.keyCode === 13) {
              setSearch(e.target.value)
            }
            if (e.target.value === '') setSearch('')
          }}
        ></Input>
        <Select
          placeholder='分类'
          value={classify}
          style={{ marginLeft: 10, minWidth: 100 }}
          onChange={(e) => setClassify(e)}>
          <Select.Option value={''}>全部分类</Select.Option>
          {directories.map((item, index) => (
            <Select.Option value={item.name} key={index}>{item.name}</Select.Option>
          ))}
        </Select>
        <div style={{ flex: 1 }}></div>
        <Pagination current={page}
          pageSize={pageSize}
          total={totalList.length}
          onChange={e => setPage(e)} />
      </div>

    )
  }
  const renderPage = () => {
    return (
      <>
        {list.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} className={styles.list_item}>
              <header>
                <h3>
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
  return (
    <Layout location={location} title={siteTitle}>
      {renderSearch()}
      {renderPage()}
    </Layout >
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
    allDirectory(filter: {name: {nin: ["blog","assets"]}}) {
      nodes {
        absolutePath
        name
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
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`
