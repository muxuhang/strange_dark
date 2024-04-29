---
title: 微信小程序js语法时间转换的问题
date: "2020-05-26 14:00"
description: "getDate() 微信小程序 时间转换 js wxs"
---
### 问题
```js
  var time1 = getDate('2020-10-10') //Sat Oct 10 2020 08:00:00 GMT+0800 (中国标准时间)
  var time2 = getDate('2020-10-10 10:10:00') //Invalid Date
  
```
- 目前发现仅在ios手机上有问题
- 以下是小程序[官方示例代码](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/06datatype.html)
```js
  var date = getDate(); //返回当前时间对象
  date = getDate(1500000000000);
  // Fri Jul 14 2017 10:40:00 GMT+0800 (中国标准时间)
  date = getDate('2017-7-14');
  // Fri Jul 14 2017 00:00:00 GMT+0800 (中国标准时间)
  date = getDate(2017, 6, 14, 10, 40, 0, 0);
  // Fri Jul 14 2017 10:40:00 GMT+0800 (中国标准时间)
```
### tips
- 一开始只是以为在wxs中会出现这种情况，改为js中后依然这样，无奈只能把2020-10-10 10:10:00改为2020, 10, 10, 10, 10, 0, 0然后再转
- 问题原因是safari浏览器只支持2020-10-10这种，后台把时间改为2020/10/10 10:10就可以了
