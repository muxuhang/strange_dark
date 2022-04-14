
import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from "react"
import styles from './toast.module.css'
let tbox;
let timeOut;
const padding = 20
const destroy = async () => {
  clearTimeout(timeOut)
  ReactDOM.unmountComponentAtNode(tbox)
}
const toast = (type = 'error', props) => {
  const duration = props.duration || 3000
  if (typeof document == undefined) {
    return
  }
  if (!tbox) {
    tbox = document.createElement('div');
    tbox.className = 'toast'
  }
  document.body && document.body.appendChild(tbox)
  timeOut = setTimeout(() => {
    destroy()
  }, duration);
  ReactDOM.render(
    <Toast type={type} props={props} />, tbox);
}
const CloseIcon = (reset) => {
  return (<button
    className={styles.closeButton}
    {...reset}>
    <div className={styles.closeIcon}></div>
  </button>)
}
const Toast = (props) => {
  const { type,
    position = 'ct',
    style = {},
    children = null,
    title = null,
    close = true
  } = props
  const toastRef = useRef()
  useEffect(() => {
    toastRef.current.style.opacity = 1
  }, [])
  return (
    <div
      ref={toastRef}
      className={`${styles.main} ${styles[type]}`}
      style={{
        ...positions[position],
        ...style,
        opacity: 0,
        transition: '0.1s'
      }}
    >
      {children ? children : (title ? title : "任务完成")}
      {close ? <CloseIcon onClick={destroy} /> : null}
    </div>
  )
}
const positions = {
  lt: { left: padding, top: padding },
  rt: { right: padding, top: padding },
  lb: { left: padding, bottom: padding },
  rb: { right: padding, bottom: padding },
  ct: { left: "50%", transform: 'translateX(-50%)', top: padding },
  cb: { left: "50%", transform: 'translateX(-50%)', bottom: padding },
  cc: { left: "50%", top: "50%", transform: 'translate(-50%,-50%)' },
}
export default toast