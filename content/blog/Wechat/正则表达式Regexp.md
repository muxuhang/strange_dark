---
title: RegExp
date: "2022-05-23 15:30"
description: "小程序 空白页面 只显示底部导航栏 正则表达式 regexp"
---

### 小程序对正则表达式支持
```js
  let regExp = '(content)/g'
  // 改为
  let regExp = new RegExp('(content)','g')
```
### ios safir浏览器对正则表达式支持问题
- 仅在ios手机上有问题
- 参考链接：https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group