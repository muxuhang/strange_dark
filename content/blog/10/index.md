---
title: window is not defind,document is not defind
date: "2020-06-10 17:00"
description: "next.js 服务端渲染 ssr渲染" 
---

#### 由于nextjs由服务端渲染端问题，导致
#### next.js文档中提供了一种动态导入模块的一种办法'next/dynamic'
https://www.nextjs.cn/docs/advanced-features/dynamic-import
```js
  import dynamic from 'next/dynamic';
  const BraftEditor = dynamic(
    () => import('braft-editor'),
    {
        ssr: false
    }
  )
  export default function Quill() {
    if (typeof window !== 'undefined') {
      return (
        <>
          <BraftEditor />
        </>
      )
    }else{
      return </>
    }
  }
```
- 参考文档: https://stackoverflow.com/questions/56319997/nextjs-window-is-not-defined

