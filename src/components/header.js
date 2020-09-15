

import React from "react"
import styles from './styles/header.module.css'
const Header = (props) => {
  const rootPath = `${__PATH_PREFIX__}/`
  console.log(rootPath);
  return (
    <div className={styles.headers}>
      <div className={styles.container}>
        <a style={{boxShadow:'none'}} href='/'><img className={styles.logo} src={require('./../images/M.png')}></img></a>
        <div className={styles.flex1}></div>
        <div className={styles.menu}>
          <a href='https://tool.mxhing.com'>实用工具</a>
        </div>
      </div>
    </div>
  )
}

export default Header
