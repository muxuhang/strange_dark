---
title: quill编辑器
date: "2022-04-12 17:16"
description: "quill js katex react-quill ImageExtend ImageResize"
---

### QuillDemo.js

```js
import React, { useEffect, useMemo, useRef, useState } from "react"
import Layout from "../components/layout"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import katex from "katex"
import "katex/dist/katex.css"
import "./../components/quill/quill.css"
import html2canvas from "html2canvas"
import { Empty, Input, Modal } from "antd"
import { ImageExtend, QuillWatch } from "../components/quill/ImageExtend"
let ImageResize
window.Quill = Quill
if (window.Quill) {
  ImageResize = require("quill-image-resize-module").default
  Quill.register("modules/imageResize", ImageResize)
  Quill.register("modules/imageExtend", ImageExtend)
}
// 固定样式 大标题、小标题、分类标题、题目，内容(完成)
// 字体 加粗、斜体、下划线(完成)
// 图片 可编辑大小(完成)
// 图片 可复制添加(完成)
// katex语法(完成)
// katex语法转生成图片(完成)
const QuillDemo = () => {
  if (!window.Quill) return
  const quillRef = useRef()
  const readRef = useRef()
  const [content, setContent] = useState("")
  const [visible, setVisible] = useState(false)
  const [latex, setLatex] = useState("")
  useEffect(() => {
    window.katex = katex
  }, [])
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          // ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ script: "sub" }, { script: "super" }],
          [{ color: [] }],
          [{ align: [] }],
          ["image", "formula"],
          ["print"],
        ],
        handlers: {
          image: () => {
            // 劫持原来的图片点击按钮事件
            QuillWatch.emit(quillRef.current.editor.id)
          },
          formula: () => {
            setVisible(true)
          },
          print: () => {
            var iframe = document.getElementById("print_iframe")
            if (!iframe) iframe = document.createElement("IFRAME")
            var el = document
              .getElementById("quill")
              .getElementsByClassName("ql-editor")
            var doc = null
            iframe.setAttribute("id", "print_iframe")
            iframe.setAttribute(
              "style",
              "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
            )
            document.body.appendChild(iframe)
            doc = iframe.contentWindow.document
            doc.write(el[0].innerHTML)
            doc.close()
            iframe.contentWindow.focus()
            setTimeout(function () {
              iframe.contentWindow.print()
            }, 50) //解决第一次样式不生效的问题
            if (navigator.userAgent.indexOf("MSIE") > 0) {
              document.body.removeChild(iframe)
            }
          },
        },
      },
      imageResize: true,
      imageExtend: {},
    }),
    []
  )
  useEffect(() => {
    _changeLatex()
  }, [latex])
  const _changeLatex = () => {
    if (!latex) return
    const readQuill = readRef.current.editor
    const result = readQuill.insertEmbed(0, "formula", latex)
    readQuill.setContents(result)
  }
  const _saveLatex = () => {
    html2canvas(document.querySelector("#read_latex .ql-editor")).then(
      canvas => {
        const oldCanvas = document.getElementById("read_canvas")
        if (oldCanvas) {
          oldCanvas.parentElement.removeChild(oldCanvas)
        }
        canvas.id = "read_canvas"
        document.body.appendChild(canvas)

        const oldImage = document.getElementById("read_image")
        if (oldImage) {
          oldImage.parentElement.removeChild(oldImage)
        }
        var image = new Image()
        image.src = canvas.toDataURL("image/png")
        image.id = "read_image"
        document.body.appendChild(image)
        const quill = quillRef.current.editor
        const range = quill.getSelection(true)
        if (range != null) {
          var index = range.index + range.length
          quill.insertEmbed(index, "image", image.src)
          quill.insertText(index + 1, " ")
          quill.setSelection(index + 2)
          setLatex("")
          setVisible(false)
        }
      }
    )
    return
    const quill = quillRef.current.editor
    const range = quill.getSelection(true)
    if (range != null) {
      var index = range.index + range.length
      quill.insertEmbed(index, "formula", latex)
      quill.insertText(index + 1, " ")
      quill.setSelection(index + 2)
      setLatex("")
      setVisible(false)
    }
  }
  const renderFormula = () => {
    return (
      <Modal
        title="Latex"
        visible={visible}
        onOk={_saveLatex}
        onCancel={() => setVisible(false)}
      >
        <Input
          value={latex}
          placeholder="latex"
          style={{ marginBottom: 10 }}
          onChange={e => setLatex(e.target.value)}
        ></Input>
        {!latex ? (
          <Empty description="latex" imageStyle={{ height: 50 }}></Empty>
        ) : (
          <ReactQuill
            theme="bubble"
            ref={readRef}
            id="read_latex"
            readOnly
            modules={{ toolbar: null }}
            style={{
              margin: "auto",
              width: "fit-content",
              height: "auto",
              maxWidth: "100%",
              padding: "0 !important",
            }}
            onChange={setContent}
          ></ReactQuill>
        )}
      </Modal>
    )
  }
  return (
    <Layout title={"QuillDemo"}>
      {renderFormula()}
      <ReactQuill
        theme="snow"
        ref={quillRef}
        id="quill"
        style={{ height: "calc(100vh - 202px)", marginTop: 15 }}
        onChange={setContent}
        modules={modules}
      ></ReactQuill>
    </Layout>
  )
}

export default QuillDemo
```

```css
#read_latex .ql-editor {
  padding: 2px 4px !important;
}

.ql-editor img {
  margin-bottom: 0;
}

#read_canvas,
#read_image {
  display: none;
}

.ql-formats .ql-print::after {
  content: url("data:image/svg+xml;%20charset=utf8,%3Csvg%20t=%221649743470460%22%20class=%22icon%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%222376%22%20width=%2218%22%20height=%2218%22%3E%3Cpath%20d=%22M704%20512v384H320V512h384z%20m-64%2064H384v256h256V576z%20m0-469.333333a64%2064%200%200%201%2064%2064v64h106.666667a64%2064%200%200%201%2064%2064v362.666666a64%2064%200%200%201-64%2064h-64v-64h64V298.666667H213.333333v362.666666h64v64h-64a64%2064%200%200%201-64-64V298.666667a64%2064%200%200%201%2064-64h106.666667V170.666667a64%2064%200%200%201%2064-64h256zM426.666667%20362.666667v64h-149.333334v-64h149.333334z%20m213.333333-192H384v64h256V170.666667z%22%20p-id=%222377%22%3E%3C/path%3E%3C/svg%3E");
}
```

##### ImageExtend

```js
/**
 * @description 图片功能拓展： 增加上传 拖动 复制
 */
export class ImageExtend {
  /**
   * @param quill {Quill}富文本实例
   * @param config {Object} options
   * config  keys: action, headers, editForm start end error  size response
   */
  constructor(quill, config = {}) {
    this.id = Math.random()
    this.quill = quill
    this.quill.id = this.id
    this.config = config
    this.file = "" // 要上传的图片
    this.imgURL = "" // 图片地址
    let quillLoading
    if (this.config.loading) {
      quillLoading = document.querySelector(".quillLoading")
      if (quillLoading === null) {
        quillLoading = document.createElement("div")
        quillLoading.classList.add("quill-loading")
        quillLoading.classList.add("extend-upload-success")
        document.querySelector(".ql-container").appendChild(quillLoading)
      }
    }
    this.quillLoading = quillLoading
    quill.root.addEventListener("paste", this.pasteHandle.bind(this), true)
    quill.root.addEventListener("drop", this.dropHandle.bind(this), false)
    quill.root.addEventListener(
      "dropover",
      function (e) {
        e.preventDefault()
      },
      false
    )

    QuillWatch.on(this.id, this)
  }

  /**
   * @description 粘贴
   * @param e
   */
  pasteHandle(e) {
    let clipboardData = e.clipboardData
    let i = 0
    let items, item, types
    if (clipboardData) {
      items = clipboardData.items
      if (!items) return
      item = items[0]
      types = clipboardData.types || []
      for (; i < types.length; i++) {
        if (types[i] === "Files") {
          item = items[i]
          break
        }
      }
      if (item && item.kind === "file" && item.type.match(/^image\//i)) {
        this.file = item.getAsFile()
        console.log(this.file)
        let self = this
        // 如果图片限制大小
        if (
          self.config.size &&
          self.file.size >= self.config.size * 1024 * 1024 &&
          self.config.loading
        ) {
          self.quillLoading.classList.remove("extend-upload-success")
          self.quillLoading.classList.add("extend-upload-warning-color")
          self.quillLoading.innerHTML = "图片大小超过限制"
          setTimeout(function () {
            self.quillLoading.classList.remove("extend-upload-warning-color")
            self.quillLoading.classList.add("extend-upload-success")
          }, 1500)
          return
        }
        if (this.config.action) {
          this.uploadImg()
        } else {
          this.toBase64()
        }
      }
    }
    e.preventDefault() //阻止默认事件(部分浏览器会另添加一张图片)
  }
  /**
   * 拖拽
   * @param e
   */
  dropHandle(e) {
    const self = this
    e.preventDefault()
    // 如果图片限制大小
    if (
      self.config.size &&
      self.file.size >= self.config.size * 1024 * 1024 &&
      self.config.loading
    ) {
      self.quillLoading.classList.add("extend-upload-warning-color")
      self.quillLoading.classList.remove("extend-upload-success")
      self.quillLoading.innerHTML = "图片大小超过限制"
      setTimeout(function () {
        self.quillLoading.classList.remove("extend-upload-warning-color")
        self.quillLoading.classList.add("extend-upload-success")
      }, 1500)
      return
    }
    self.file = e.dataTransfer.files[0] // 获取到第一个上传的文件对象
    if (!self.file) return
    if (this.config.action) {
      self.uploadImg()
    } else {
      self.toBase64()
    }
  }
  /**
   * @description 将图片转为base4
   */
  toBase64() {
    const self = this
    const reader = new FileReader()
    reader.onload = e => {
      // 返回base64
      self.imgURL = e.target.result
      self.insertImg()
    }
    reader.readAsDataURL(self.file)
  }
  /**
   * @description 上传图片到服务器
   */
  uploadImg() {
    const self = this
    let quillLoading = self.quillLoading
    let config = self.config
    // 构造表单
    let formData = new FormData()
    formData.append(config.name, self.file)
    // 自定义修改表单
    if (config.editForm) {
      config.editForm(formData)
    }
    // 创建ajax请求
    let xhr = new XMLHttpRequest()
    xhr.open("post", config.action, true)
    // 如果有设置请求头
    if (config.headers) {
      config.headers(xhr)
    }
    if (config.change) {
      config.change(xhr, formData)
    }
    xhr.onload = function (e) {
      if (self.config.loading) {
        setTimeout(function () {
          quillLoading.classList.add("extend-upload-success")
        }, 1000)
      }
      if (xhr.status === 200) {
        self.quill.root.innerHTML = self.quill.root.innerHTML.replace(
          "[uploading...]",
          ""
        )
        let res = JSON.parse(xhr.responseText)
        self.imgURL = config.response(res)
        self.insertImg()
      } else {
        self.quill.root.innerHTML = self.quill.root.innerHTML.replace(
          "[uploading...]",
          "[upload error]"
        )
      }
    }
    // 开始上传数据
    xhr.upload.onloadstart = function (e) {
      let length =
        (self.quill.getSelection() || {}).index || self.quill.getLength()
      self.quill.insertText(length, "[uploading...]", { color: "red" }, true)
      if (self.config.loading) {
        quillLoading.classList.remove("extend-upload-success")
      }
      if (config.start) {
        config.start()
      }
    }
    // 上传过程
    xhr.upload.onprogress = function (e) {
      let complete = (((e.loaded / e.total) * 100) | 0) + "%"
      if (self.config.loading) {
        quillLoading.innerHTML = "已上传" + complete
      }
    }
    // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
    xhr.upload.onerror = function (e) {
      self.quill.root.innerHTML = self.quill.root.innerHTML.replace(
        "[uploading...]",
        "[upload error]"
      )
      if (self.config.loading) {
        self.quillLoading.classList.add("extend-upload-warning-color")
        quillLoading.innerHTML = "网络异常，失败请重试"
        setTimeout(function () {
          self.quillLoading.classList.remove("extend-upload-warning-color")
          quillLoading.classList.add("extend-upload-success")
        }, 1500)
      }
      if (config.error) {
        config.error()
      }
    }
    // 上传数据完成（成功或者失败）时会触发
    xhr.upload.onloadend = function (e) {
      if (config.end) {
        config.end()
      }
    }
    xhr.send(formData)
  }
  /**
   * @description 往富文本编辑器插入图片
   */
  insertImg() {
    const self = this
    self.quill.blur()
    let length =
      (this.quill.getSelection() || {}).index || this.quill.getLength()
    self.quill.insertEmbed(length, "image", self.imgURL, "user")
    self.quill.setSelection(length + 1)
  }
}
/**
 *@description 观察者模式 全局监听富文本编辑器
 */
export const QuillWatch = {
  watcher: {}, // 登记编辑器信息
  active: null, // 当前触发的编辑器
  on: function (imageExtendId, ImageExtend) {
    // 登记注册使用了ImageEXtend的编辑器
    if (!this.watcher[imageExtendId]) {
      this.watcher[imageExtendId] = ImageExtend
    }
  },
  emit: function (activeId) {
    // 事件发射触发
    imgHandler()
    console.log(this.watcher, activeId)
    this.active = this.watcher[activeId]
  },
}
/**
 * @description 点击图片上传
 */
export function imgHandler() {
  let fileInput = document.querySelector(".quill-image-input")
  if (fileInput === null) {
    fileInput = document.createElement("input")
    fileInput.setAttribute("type", "file")
    fileInput.classList.add("quill-image-input")
    fileInput.style.display = "none"
    // 监听选择文件
    fileInput.addEventListener("change", function () {
      let self = QuillWatch.active
      console.log(self)
      self.file = fileInput.files[0]
      fileInput.value = ""
      // 如果图片限制大小
      if (
        self.config.size &&
        self.file.size >= self.config.size * 1024 * 1024 &&
        self.config.loading
      ) {
        self.quillLoading.classList.remove("extend-upload-success")
        self.quillLoading.classList.add("extend-upload-warning-color")
        self.quillLoading.innerHTML = "图片大小超过限制"
        setTimeout(function () {
          self.quillLoading.classList.remove("extend-upload-warning-color")
          self.quillLoading.classList.add("extend-upload-success")
        }, 1500)
        return
      }
      if (self.config.action) {
        self.uploadImg(self.config.change)
      } else {
        self.toBase64()
      }
    })
    document.body.appendChild(fileInput)
  }
  fileInput.click()
}
```

原版 ImageExtend https://github.com/NextBoy/quill-image-extend-module

[QuillDemo](/QuillDemo)
