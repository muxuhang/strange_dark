---
title: "Manifest merger failed : Attribute application@appComponentFactory"
date: "2020-04-21"
description: "AndroidX支持 react-native"
---
解决方法：在grade.properties添加
```javascript
// javascript
android.useAndroidX=true
android.enableJetifier=true
```
参考地址：
https://github.com/material-components/material-components-android/issues/193