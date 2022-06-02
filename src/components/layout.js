import React from "react"
import Footer from '../components/footer'
import Header from '../components/Header'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from "antd";
const Layout = ({ children, title }) => {
  return (
    <ConfigProvider locale={zhCN}>
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
    </ConfigProvider>
  )
}

export default Layout
