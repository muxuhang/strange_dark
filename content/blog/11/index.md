---
title: js瀑布流
date: "2020-09-15 14:45"
description: "javascript 瀑布流"
---

```html
<div class="content-main" id="content-main" style="position:relative;">
  <div class="item-card">
    <img src="" alt="" />
  </div>
  <div class="item-card">
    <img src="" alt="" />
  </div>
  <div class="item-card">
    <img src="" alt="" />
  </div>
  <div class="item-card">
    <img src="" alt="" />
  </div>
</div>
```

```js
function setWaterfall() {
  //设置容器最大宽度
  let maxwidth = document.getElementById("content-main").clientWidth
  let y = 0
  let x = 0
  let column = 1
  if (maxwidth <= 768) {
    column = 2
  } else if (maxwidth <= 1024) {
    column = 3
  } else {
    column = 4
  }
  //设置子模块最大宽度
  let width = maxwidth / column
  let cols = new Array(column).fill(y)
  document.querySelectorAll("#content-main .item-card").forEach(row => {
    row.style.position = "absolute"
    row.style.width = width + "px"
    y = Math.min.apply(null, cols)
    x = cols.indexOf(y)
    row.style.top = y + "px"
    row.style.left = width * x + "px"
    cols[x] += row.clientHeight
  })
  document.getElementById("content-main").style.height = Math.max.apply(null, cols) + "px"
}
setWaterfall()
window.onresize = function () {
  setWaterfall()
}
```
