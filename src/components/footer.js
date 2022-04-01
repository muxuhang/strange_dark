import React from "react"
import styles from "./styles/footer.module.css"
const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <a className={styles.copyname} href='http://beian.miit.gov.cn/'>鲁ICP备19017488号-1</a>
      </div>
    </div>
  )
}

export default Footer
