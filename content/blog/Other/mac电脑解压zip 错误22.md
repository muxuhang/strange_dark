---
title: mac电脑解压zip 错误22
date: "2020-06-04 10:31"
description: "mac zip 错误22" 
---


#### 无法创建非法编码的文件名。这种情况，很有可能是因为被压缩文件是在Windows系统中按照其编码做的命名，放到Mac中就出问题了。
```js
  brew install unar
  unar -e GBK yourfile.zip
```
- 参考链接 https://blog.csdn.net/kid551/article/details/103469596
- windows 压缩文件时建议放入文件夹，文件夹使用英文命名


