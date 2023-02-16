---
title: fs 创建模版
date: "2022-07-13 11:16"
description: "fs 模版 自定义模版"
---
#### 结构
```
-- template
  -- pages
    -- [pid].js
    -- index.js
  -- create.js
```
#### create.js
```js
const fs = require('fs')
const name = process.argv.slice(2)[0]
const title = process.argv.slice(3)[0]
if (!name || !title) {
  console.error('------ error ------');
  console.error('例: node create.js test 测试');
  console.error('------ end ------');
}
else {
  const Name = name.substring(0, 1).toUpperCase() + name.substring(1);
  let basepath = 'pages/' //插入文件位置
  let reads = [`template/pages/index.js`, `template/pages/[pid].js`];//要读取的文件
  async function creatCpt() {
    try {
      await exists(); // 检测文件夹
      const file = await readFile(); // 读取模板内容
      await writeFile(file); //写入组件
    }
    catch (err) {
      console.error(err);
    }
  }
  // 检测文件夹
  let exists = function () {
    return new Promise((res) => {
      (async function () {
        fs.existsSync(basepath + name) ? basepath = `${basepath}${name}/` : await mkdir(name);
        res(basepath);
      })()
    })
  }
  // 创建文件夹
  let mkdir = function (name) {
    return new Promise((res, rej) => {
      fs.mkdir(basepath + name, (err) => {
        if (err) rej(err);
        basepath = `${basepath}${name}/`
        res(basepath);
      });
    })
  }
  // 读取文件内容
  let readFile = function () {
    let file = []
    return new Promise((res) => {
      for (let a of reads) {
        let text = fs.readFileSync(a).toString();
        text = text.replace(/demo/g, name);
        text = text.replace(/Demo/g, Name)
        text = text.replace('{/* 标题 */}', title)
        const insertIndex = text.indexOf('columns = [')
        if (insertIndex >= 0 && fs.existsSync(`jsons/${name}.json`)) {
          const insertText = insertJsons()
          text = text.substring(0, insertIndex + 11) + insertText + text.substring(insertIndex + 11)
        }
        const insertIndex2 = text.indexOf('{/* 输入 */}')
        if (insertIndex2 >= 0 && fs.existsSync(`jsons/${name}.json`)) {
          const insertText = insertJsons2()
          text = text.substring(0, insertIndex2) + insertText + text.substring(insertIndex2)
        }
        file.push(text)
      }
      res(file);
    })
  }
  let writeFile = function (file) {
    return new Promise((res, rej) => {
      (async function () {
        for (let i in file) {
          if (fs.existsSync(`${basepath}${i == 0 ? 'index' : '[pid]'}.js`)) return
          await fs.writeFile(`${basepath}${i == 0 ? 'index' : '[pid]'}.js`,
            file[i], (err) => {
              if (err) rej(err)
            })
        }
        res('succ');
      })()
    })
  }
  let insertJsons = function () {
    let jsons = JSON.parse(fs.readFileSync(`jsons/${name}.json`).toString())
    const list = Object.keys(jsons)
    let result = ``
    list.map((item) => {
      console.log(jsons[item]);
      result = result + `
    { title: '${jsons[item].value}', key: '${item}', dataIndex: '${item}' },`
    })
    return result
  }
  let insertJsons2 = function () {
    let jsons = JSON.parse(fs.readFileSync(`jsons/${name}.json`).toString());
    const list = Object.keys(jsons)
    let result = ``
    list.map((item) => {
      if (jsons[item].type == 'String' || jsons[item].type == 'Number') {
        result = result + `
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>${jsons[item].value}</Col>
        <Col xs={24} sm={14}>
          <Input ${jsons[item].type == 'Number' ? `
            type={'number'}` : ''}
            onChange={(e) => changeText(e.target.value, '${item}')}
            value={details.${item}}></Input>
        </Col>
      </Row>`
      }
    })
    return result
  }
  creatCpt()
}

```

#### [pid].js
```js

import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Col, Input, message, Row } from 'antd';
const Demo = () => {
  const [details, setDetails] = useState({
    updated_at: new Date(),
    created_at: new Date()
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/demo/${pid}`, null, (res) => {
      if (res._id) {
        setDetails(res)
      }
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveDemo = async () => {
    network('POST', '/demo/', details, (res) => {
      if (res._id) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message || '创建失败')
      }
    })
  }
  // 修改
  const changeDemo = async () => {
    network('PATCH', `/demo/${pid}`, details, (res) => {
      if (res.modifiedCount) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message || '修改失败')
      }
    })
  }
  return (
    <Box>
      <Breadcrumb style={{ paddingBottom: 16 }}>
        <Breadcrumb.Item ><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href='/demo'>{/* 标题 */}</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      {/* 输入 */}
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4}>创建时间</Col>
        <Col xs={24} sm={14} flex={1}>
          <Input value={utils.timeformat(details.created_at)} disabled></Input>
        </Col>
      </Row>}
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>修改时间</Col>
        <Col xs={24} sm={14}>
          <Input value={utils.timeformat(details.updated_at ? details.updated_at : details.created_at)} disabled></Input></Col>
      </Row>}
      <Row gutter={[8, 16]}>
        <Button
          type='primary'
          disabled={!details.username}
          style={{ marginTop: 30 }}
          onClick={!details._id ?
            saveDemo :
            changeDemo}>保存</Button>
      </Row>
    </Box>
  )
}
export default Demo
```
#### index.js
```js
import React from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const UsersList = () => {
  const title = '{/* 标题 */}'
  const https = 'demo'
  const router = useRouter()
  const columns = [
    { title: '更新时间', key: 'updated_at', dataIndex: 'updated_at', render: renderCreated },
    { title: '创建时间', key: 'created_at', dataIndex: 'created_at', render: renderCreated },
    {
      title: '编辑', key: 'edit', render: (v) => (<>
        <a onClick={() => router.push(`/${https}/${v._id}`)}>编辑</a>
      </>)
    }
  ]
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Tables
        https={https}
        title={title}
        columns={columns} />
    </Box>
  )
}
export default UsersList

```