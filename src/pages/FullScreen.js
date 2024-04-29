import React, { useEffect, useState } from "react"
import FScreen from "../components/Fscreen/FScreen"
import $ from 'jquery';
let TweenLite
if (typeof window !== 'undefined') {
  window.$ = $
  if (window.$) {
    const Tween = require("./../Tween/TweenMax")
    TweenLite = Tween.TweenLite
  }
}
const FullScreen = () => {
  useEffect(() => {
    TweenLite.to('#fullpage', 2, {
      scrollTo: 300,
      // ease: Power2.easeOut
    });
  }, [])
  return (<>
    <FScreen />
  </>)
}

export default FullScreen