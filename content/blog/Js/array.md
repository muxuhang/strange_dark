---
title: array
date: "2022-03-31 17:16"
description: "常用"
---

## 常用数组方法

#### 截取数组

```js
const a = [1, 2, 3, 4]
const start = 1
const end = 2 //为空时=a.length-1
a.slice(start, end) //[2, 3]
```

#### 拼接数组

```js
const a = [1, 2, 3, 4]
const b = [2, 3, 4, 5]
a.concat(b) //[1, 2, 3, 4, 2, 3, 4, 5]
a.push(...b) //[1, 2, 3, 4, 2, 3, 4, 5]
```

#### 数组过滤重复

```js
const list = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]
const result = list.filter((item, index) => list.indexOf(item) == index)
console.log(result) //[1, 2, 3, 4, 5, 6]
```

#### 数组删除符合条件

```js
const value = 4
const list = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]
const result = list.filter((item, index) => item !== value)
console.log(result) //[1, 2, 3, 5, 6, 5, 3, 2]
```

#### 判断数组是否存在满足条件的 item

```js
const list = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]
list.some(item => item == 4) //true
list.some(item => item == 7) //false
```

#### 数组排序

```js
const list = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]
const result = list.sort((a, b) => a - b)
console.log(result) //[1, 2, 2, 3, 3, 4, 4, 5, 5, 6]
// sort会改变原数组
```

#### 特殊结构对象转数组

```js
const obj = {
  0: { title: "title1", id: 1 },
  1: { title: "title2", id: 2 },
}
const result = Object.keys(obj).map(item=>obj[item])
console.log(result) //[{ title: "title1", id: 1 }, { title: "title2", id: 2 }]
```

#### 判断一个数组中含有另一个数组的某一项

```js
const list1 = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]
const list2 = [2, 3, 4, 10]
const list3 = [10, 12]
const result1 = list1.find(e=>list2.includes(e))
console.log(result1) //[2, 3, 4]
const result2 = list1.find(e=>list3.includes(e))
console.log(result2) //undefined
```
