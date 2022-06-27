import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import 'katex/dist/katex.css';
import './quill.css';
import html2canvas from 'html2canvas'
import { Checkbox, Empty, Input, Modal } from "antd";
import { ImageExtend, QuillWatch } from "./ImageExtend";
import htmInsert from './htmInsert'
let ImageResize, ReactQuill, Quill
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill');
  Quill = ReactQuill.Quill;
  window.Quill = Quill
}
if (typeof window !== 'undefined' && window.Quill) {
  ImageResize = require("quill-image-resize-module").default;
  Quill.register('modules/imageResize', ImageResize);
  Quill.register('modules/imageExtend', ImageExtend);
  htmInsert(Quill)
}
// 固定样式 大标题、小标题、分类标题、题目，内容(完成)
// 字体 加粗、斜体、下划线(完成)
// 图片 可编辑大小(完成)
// 图片 可复制添加(完成)
// 图片 可同时复制多张图片()
// katex语法(完成)
// katex语法转生成图片(完成)
// 图片文字同时复制
// 或者多图片复制
// 添加选项
// 添加答案
const MQuill = forwardRef((props, ref) => {
  const { style, data, setData, container, disabled, active, setRightOption, onSelect, theme = 'snow' } = props
  window.katex = katex
  if (typeof window === 'undefined' || !window.Quill) return <></>
  const quillRef = useRef()
  const readRef = useRef()
  const [content, setContent] = useState(data)
  const [visible, setVisible] = useState(false)
  const [latex, setLatex] = useState('')
  useImperativeHandle(ref, () => ({
    quill: quillRef.current.editor
  }))
  const modules = useMemo(() => ({
    history: {
      delay: 1000
    },
    toolbar: {
      container: container ? container : [
        ['bold', 'italic', 'underline', 'strike'],
        // ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'color': [] }],
        [{ 'align': [] }],
        ['image', 'formula']
      ],
      handlers: {
        image: () => {  // 劫持原来的图片点击按钮事件
          QuillWatch.emit(quillRef.current.editor.id)
        },
        formula: () => {
          setVisible(true)
        },
        print: () => {
          var iframe = document.getElementById("print_iframe")
          if (!iframe) iframe = document.createElement('IFRAME');
          var el = document.getElementById("quill").getElementsByClassName('ql-editor');
          var doc = null;
          iframe.setAttribute("id", "print_iframe");
          iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
          document.body.appendChild(iframe);
          doc = iframe.contentWindow.document;
          doc.write(el[0].innerHTML);
          doc.close();
          iframe.contentWindow.focus();
          setTimeout(function () { iframe.contentWindow.print(); }, 50)  //解决第一次样式不生效的问题
          if (navigator.userAgent.indexOf("MSIE") > 0) {
            document.body.removeChild(iframe);
          }
        }
      }
    },
    imageResize: true,
    imageExtend: {}
  }), [])
  useEffect(() => {
    _changeLatex()
  }, [latex])
  const _changeLatex = () => {
    if (!latex) return
    const readQuill = readRef.current.editor
    const result = readQuill.insertEmbed(0, 'formula', latex);
    readQuill.setContents(result)
  }
  const _saveLatexToImage = async () => {
    const dom = document.querySelector("#read_latex .ql-editor p")
    html2canvas(dom, {
      scale: 1,
      logging: true,
    }).then(canvas => {
      const oldCanvas = document.getElementById('read_canvas')
      if (oldCanvas) {
        oldCanvas.parentElement.removeChild(oldCanvas)
      }
      canvas.id = 'read_canvas'
      document.body.appendChild(canvas)
      const oldImage = document.getElementById('read_image')
      if (oldImage) {
        oldImage.parentElement.removeChild(oldImage)
      }
      var ctx = canvas.getContext('2d')
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      image.id = 'read_image'
      const quill = quillRef.current.editor
      const range = quill.getSelection(true)
      if (range != null) {
        var index = range.index + range.length;
        // -------------------------  //
        quill.insertEmbed(index, 'image', image.src);
        quill.insertText(index + 1, ' ');
        quill.setSelection(index + 2);
        setLatex('')
        setVisible(false)
      }
    });
  }
  const _saveLatex = async () => {
    // latex 格式
    const quill = quillRef.current.editor
    const range = quill.getSelection(true)
    if (range != null) {
      var index = range.index + range.length;
      quill.insertEmbed(index, 'formula', latex);
      quill.insertText(index + 1, ' ');
      quill.setSelection(index + 2);
      setLatex('')
      setVisible(false)
    }
  }
  const renderFormula = () => {
    return <Modal
      title="Latex"
      visible={visible}
      onOk={_saveLatexToImage}
      okText='保存为图片'
      cancelText='保存为公式'
      onCancel={_saveLatex}
    >
      <Input
        value={latex}
        placeholder="latex"
        style={{ marginBottom: 10 }}
        onChange={(e) => setLatex(e.target.value)}></Input>
      {!latex ? <Empty
        description='latex'
        imageStyle={{ height: 50 }}></Empty> :
        <ReactQuill
          theme="bubble"
          ref={readRef}
          id='read_latex'
          readOnly
        ></ReactQuill>}
    </Modal>
  }
  const hasContainer = (e) => {
    let result = false
    e.map((item) => {
      item.map((row) => {
        if (row === 'radio') result = true
      })
    })
    return result
  }
  return (
    <div style={{ position: 'relative', ...style }}>
      {renderFormula()}
      {!disabled && container && hasContainer(container) ? <div style={{
        position: 'absolute', height: 24, width: 28,
        left: 10, top: 9, display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}>
        <Checkbox
          checked={active}
          onChange={setRightOption && setRightOption}
          style={{ cursor: 'pointer' }}></Checkbox>
      </div> : null}
      <ReactQuill
        theme={theme}
        ref={quillRef}
        id="quill"
        style={style}
        readOnly={disabled}
        onChange={(e) => {
          setContent(e)
          setData && setData(e)
        }}
        modules={modules}
        value={content}
        placeholder='请输入'
      >
      </ReactQuill>
    </div>
  )
})

export default MQuill
