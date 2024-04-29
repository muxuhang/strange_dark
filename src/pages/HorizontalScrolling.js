import React, { useEffect, useState } from "react"
import { gsap } from 'gsap'
import "../components/HorizontalScrolling/main.css";
import isMobile from "../components/HorizontalScrolling/isMobile";
import { TextPlugin, ScrollTrigger, ScrollToPlugin, EasePack, Draggable } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, TextPlugin, EasePack);

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
      renderPanels(tween, panelsContainer)
  }, [])
  // 滚动主体
  const renderPanels = (tween, panelsContainer) => {
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
    renderControls(tween, panelsContainer)
    renderAnimate(tween)
    renderWelcome(tween)
    renderDraw(tween)
  }
  // // lin跳转
  const renderControls = (tween, panelsContainer) => {
    console.log(tween);
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
  }
  const renderAnimate = (tween) => {
    gsap.to('#pietoScale', {
      x: innerWidth - 200,
      rotate: 3600,
      borderWidth: 10,
      keyframes: [
        { backgroundColor: '#333333', y: -(innerHeight - 200) / 2, borderRadius: 100 },
        { backgroundColor: '#495321', y: 0, borderRadius: 0 },
        { backgroundColor: '#495321', y: (innerHeight - 200) / 2, borderRadius: 100 },
        { backgroundColor: '#ffffff', y: 0, borderRadius: 0 }
      ],
      ease: "none",
      scrollTrigger: {
        trigger: "#pietoScale",
        containerAnimation: tween,
        start: "center center",
        end: "+=" + (innerWidth - 200),
        scrub: true
      }
    });
  }
  const renderWelcome = (tween) => {
    gsap.to("#welcome_text", {
      duration: 2,
      text: {
        value: "Welcome",
        newClass: "welcome_text1",
        oldClass: "welcome_text2"
      },
      ease: "none",
    });
  }
  const renderDraw = () => {
    console.log(Draggable);
    console.log(document.getElementById("panel-3"));
    // Draggable.create("#draw_id", {
    //   type: "y",
    //   bounds: document.getElementById("panel-3"),
    //   inertia: true,
    //   onClick: function () {
    //     console.log("clicked");
    //   },
    //   onDragEnd: function () {
    //     console.log("drag ended");
    //   }
    // });
  }
  return (
    <div id="page" className="site">
      <header id="masthead" className="site-header" role="banner">
        <nav className="anchor-nav" role="navigation">
          <a href="#intro" className="anchor">Home</a>
          <a href="#panel-1" className="anchor">Panel 1</a>
          <a href="#panel-3" className="anchor">Panel 3</a>
          <a href="#panel-5" className="anchor">Panel 5</a>
          <a href="#map" className="anchor">Map</a>
        </nav>
      </header>
      <main id="content" className="site-content" role="main">
        <section id="panels">
          <div id="panels-container" style={mobile ? {
            width: '100%',
            display: 'block',
            height: 'auto',
          } : {
            width: '500%'
          }}>
            <article id="panel-1" className="panel full-screen red">
              <div id="welcome_text"></div>
            </article>
            <article id="panel-2" className="panel full-screen orange" style={mobile ? {
              height: '300vw'
            } : {

            }}>
              <div id='pietoScale' style={{
                height: 200,
                width: 200,
                backgroundColor: '#ffffff',
                position: 'absolute',
                left: 0
              }}></div>
            </article>
            <article id="panel-3" className="panel full-screen purple">
              <div id="draw_id" style={{ height: 100, width: 100, background: 'grey' }}></div>
            </article>
            <article id="panel-4" className="panel full-screen green">

            </article>
            <article id="panel-5" className="panel full-screen gray">

            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HorizontalScrolling
