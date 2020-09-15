---
title: 微信小程序固定钉
date: "2020-06-02 18:00"
description: "微信小程序 固定钉 onPageScroll getSystemInfo windowWidth rem/rpx" 
---

#### 设置scrollTop,根据scrollTop设置css样式
```js
  const app = getApp()
  Page({
    data: {
      scrollTop:0
    },
    onLoad: function () {
      let _this = this
      wx.getSystemInfo({
        complete: (res) => {
          console.log(res)
          _this.setData({rpxRem:750/res.windowWidth})
        },
      })
    },
    onPageScroll(e){
      this.setData({
        scrollTop:e.scrollTop*this.data.rpxRem/2
      })
    }
  })
```

#### wxml
```wxml
  <view class="intro" style="{{scrollTop>200?'background:black;top:0;position:fixed':''}}"></view>
  <view style="height:2000px"></view>
```

#### wxss
```wxss
  .intro {
    position: relative;
    top: 400rpx;
    background-color: red;
    height: 40rpx;
    width: 100rpx;
  }
```

