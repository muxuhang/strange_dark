

import React from "react"
import styles from './styles/header.module.css'
const Header = () => {
  return (
    <div className={styles.headers}>
      <div className={styles.container}>
        <a style={{ boxShadow: 'none' }} href='/'>
          <img className={styles.logo} src={require('./../images/M.png')} alt=''>
          </img>
        </a>
        <div className={styles.flex1}></div>
        <div className={styles.menu}>
          <a href='https://tool.cacti.cc'>实用工具</a>
        </div>
      </div>
    </div>
  )
}

export default Header
