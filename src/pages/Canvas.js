import React, { useEffect, useState } from "react"

const CanvasScreen = () => {
  const [size, setSize] = useState({ width: 800, height: 600 })
  useEffect(() => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    console.log(ctx);
    // 绘制四边形
    // ctx.fillStyle = "rgba(200,0,0,0.8)";
    // ctx.fillRect(40, 40, 55, 50);
    // 绘制多边形
    // ctx.beginPath();
    // ctx.moveTo(90, 90);
    // ctx.lineTo(150, 90);
    // ctx.lineTo(150, 150);
    // ctx.lineTo(90, 150);
    // ctx.lineTo(60, 120);
    // ctx.fill();
    // 
    //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 75);
    ctx.bezierCurveTo(75, 75, 75, 75, 75, 75);
    ctx.fill();

  }, [])
  return (<>
    <canvas id='canvas'
      style={{ border: '1px solid black', margin: '0 auto', display: 'block' }}
      height={size.height}
      width={size.width}></canvas>
  </>)
}

export default CanvasScreen