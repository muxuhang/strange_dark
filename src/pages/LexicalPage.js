import React, { useEffect, useState } from "react"
import styles from '../utils/main.module.css'
const LexicalPage = () => {
  const [current, setCurrent] = useState('00:00:00')
  const [begin, setBegin] = useState('00:00:00')
  useEffect(() => {

    const timmer = setInterval(() => {
      setTime()
    }, 1000);
    return () => clearInterval(timmer)
  }, [])
  const setTime = () => {
    const currentTime = new Date()
    const h = currentTime.getHours().toString().padStart(2, '0')
    const m = currentTime.getMinutes().toString().padStart(2, '0')
    const s = currentTime.getSeconds().toString().padStart(2, '0')
    setCurrent(`${h}:${m}:${s}`)
  }
  return (<div style={{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh'
  }}>
    <div className={styles.gridConcreteDue}
      style={{
        fontSize: 150
      }}>{begin}</div>
    <div className={styles.gridConcreteDue}
      style={{
        fontSize: 150
      }}>{current}</div>
  </div>)
}

export default LexicalPage