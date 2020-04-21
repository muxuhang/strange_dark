import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Footer from '../components/footer'
import Header from '../components/Header'
const Layout = ({ children }) => {
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      <Header></Header>
      <main
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          width: '1200px',
          maxWidth:'96%',
          padding:rhythm(1),
          flex:1
        }}
      >{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
