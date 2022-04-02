---
title: 微信公众号上传图片不能使用相机问题
date: "2020-09-15 14:50"
description: "微信公众号 react antd input accept='image/*' capture='camera'"
---
#### 问题出现复现
```text
  1、默认使用的antd 的组件 upload，这里没有添加 accept='image/*' capture='camera'
  2、导致在很多浏览器都有拍照和相册两个选项，但就在微信公众号里没有
```
