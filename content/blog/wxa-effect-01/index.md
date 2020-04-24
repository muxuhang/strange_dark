---
title: 微信小程序城市选择
date: "2020-04-24 10:00"
description: "首字母查询 微信小程序 index-list"
---
### 引入组件
```node
  npm init
  npm i @miniprogram-component-plus/index-list --save
```
### 使用
- 微信开发工具/详情/本地设置中，使用npm模块
- 微信开发工具/工具，构建npm
### wxml
```html
<index-list list="{{cities}}" bindchoose="chooseCity"></index-list>
```

### js
```js
const QQMapWX = require("./lib/qqmap-wx-jssdk.min.js")
const QQMapKey = "NDLBZ-4Y6KF-S2LJ6-NAOAA-BOW56-LMB44"
const qqmapsdk = new QQMapWX({
  key: QQMapKey,
})
Page({
  data: {
    cities: [],
  },
  onLoad: function (options) {
    this.getCities()
  },
  chooseCity(e) {
    console.log(e.detail.item)
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      city: e.detail.item.name,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getCities() {
    const _this = this
    qqmapsdk.getCityList({
      success(res) {
        const cities = res.result[1]
        // 按拼音排序
        cities.sort((c1, c2) => {
          let pinyin1 = c1.pinyin.join("")
          let pinyin2 = c2.pinyin.join("")
          return pinyin1.localeCompare(pinyin2)
        })
        // 添加首字母
        const map = new Map()
        for (const city of cities) {
          const alpha = city.pinyin[0].charAt(0).toUpperCase()
          if (!map.has(alpha)) map.set(alpha, [])
          map.get(alpha).push({
            name: city.fullname,
          })
        }
        const keys = []
        for (const key of map.keys()) {
          keys.push(key)
        }
        keys.sort()
        const list = []
        for (const key of keys) {
          list.push({
            alpha: key,
            subItems: map.get(key),
          })
        }
        _this.setData({
          cities: list,
        })
      },
    })
  },
})
```

### json
```json
{
  "usingComponents": {
		"index-list": "/@miniprogram-component-plus/index-list"
	}
}
```


### Tip
- 在官方demo少许改动
- json中引用原版是"index-list": "@miniprogram-component-plus/index-list"，但我尝试时是需要加/才可以引用
- js中QQMapKey需要自己注册
- js中引用的[qqmap-wx-jssdk.min.js](./qqmap-wx-jssdk.min.js)