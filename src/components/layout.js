import React from "react"
import Footer from '../components/footer'
import Header from '../components/Header'
const Layout = ({ children, title }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header></Header>
      <main
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: '1200px',
          width: '96%',
          flex: 1
        }}
      >{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
