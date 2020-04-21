---
title: "AndroidX支持"
date: "2020-04-21"
description: "Manifest merger failed : Attribute application@appComponentFactory"
---
解决方法：在grade.properties添加
```javascript
// javascript
android.useAndroidX=true
android.enableJetifier=true
```
参考地址：
https://github.com/material-components/material-components-android/issues/193