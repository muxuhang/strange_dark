import React, { useEffect, useState } from "react"
import { gsap } from 'gsap'
import "../components/HorizontalScrolling/main.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import isMobile from "../components/HorizontalScrolling/isMobile";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const HorizontalScrolling = () => {
  const [loading, setLoading] = useState(true)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(isMobile())
    if (isMobile()) {
      console.log('手机端');
      return
    }
    let panelsContainer = document.querySelector("#panels-container"),
      tween;

    document.querySelectorAll(".anchor").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute("href")),
          y = targetElem;
        if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
          let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
            totalMovement = (panels.length - 1) * targetElem.offsetWidth;
          y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
        }
        gsap.to(window, {
          scrollTo: {
            y: y,
            autoKill: false
          },
          duration: 1
        });
      });
    });

    /* Panels */
    const panels = gsap.utils.toArray("#panels-container .panel");
    tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 0,
        // snap: {
        //   snapTo: 1 / (panels.length - 1),
        //   inertia: false,
        //   duration: { min: 0.1, max: 0.1 }
        // },
        end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
      }
    });
    renderAnimate(tween)
  }, [])
  const renderAnimate = (tween) => {
    gsap.to('#pietoScale', {
      x: innerWidth - 200,
      backgroundColor: "#1e90ff",
      ease: "none",
      scrollTrigger: {
        trigger: "#pietoScale",
        containerAnimation: tween,
        start: "left left",
        end: "+=" + (innerWidth - 200),
        scrub: true
      }
    });
  }
  return (
    <div id="page" className="site">
      {/* <header id="masthead" className="site-header" role="banner">
        <nav className="anchor-nav" role="navigation">
          <a href="#intro" className="anchor">Home</a>
          <a href="#panel-1" className="anchor">Panel 1</a>
          <a href="#panel-3" className="anchor">Panel 3</a>
          <a href="#panel-5" className="anchor">Panel 5</a>
          <a href="#map" className="anchor">Map</a>
        </nav>
      </header> */}
      <main id="content" className="site-content" role="main">
        {/* <section id="intro" className="full-screen blue"></section> */}
        <section id="panels">
          <div id="panels-container" style={mobile ? {
            width: '100%',
            display: 'block',
            height: 'auto'
          } : {
            width: '500%'
          }}>
            {/* 第一屏 */}
            <article id="panel-1" className="panel full-screen red">

            </article>
            {/* 第二屏 */}
            <article id="panel-2" className="panel full-screen orange" style={mobile ? {
              height: '300vw'
            } : {}}>
              <div id='pietoScale' style={{
                height: 200,
                width: 200,
                background: 'green',
                position: 'absolute',
                left: 0
              }}>22222</div>
            </article>
            {/* 第三屏 */}
            <article id="panel-3" className="panel full-screen purple">

            </article>
            {/* 第四屏 */}
            <article id="panel-4" className="panel full-screen green">

            </article>
            {/* 第五屏 */}
            <article id="panel-5" className="panel full-screen gray">

            </article>
          </div>
        </section>
        {/* <section id="map" className="full-screen"></section> */}
      </main>
    </div>
  )
}

export default HorizontalScrolling
