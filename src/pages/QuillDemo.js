import React, { useEffect, useMemo, useRef, useState } from "react"
import Layout from "../components/layout"
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import 'katex/dist/katex.css';
import './../components/quill/quill.css';
import html2canvas from 'html2canvas'
import { Empty, Input, Modal } from "antd";
import { ImageExtend, QuillWatch } from "../components/quill/ImageExtend";
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
}
// 固定样式 大标题、小标题、分类标题、题目，内容(完成)
// 字体 加粗、斜体、下划线(完成)
// 图片 可编辑大小(完成)
// 图片 可复制添加(完成)
// katex语法(完成)
// katex语法转生成图片(完成)
// 图片文字同时复制，或者多图片复制
const QuillDemo = () => {
  if (typeof window === 'undefined' || !window.Quill) return <></>
  const quillRef = useRef()
  const readRef = useRef()
  const [content, setContent] = useState('')
  const [visible, setVisible] = useState(false)
  const [latex, setLatex] = useState('')
  useEffect(() => {
    window.katex = katex
  }, [])
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        // ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'color': [] }],
        [{ 'align': [] }],
        ['image', 'formula'],
        ['print'],
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
  const _saveLatex = () => {
    html2canvas(document.querySelector("#read_latex .ql-editor")).then(canvas => {
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
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      image.id = 'read_image'
      document.body.appendChild(image);
      const quill = quillRef.current.editor
      const range = quill.getSelection(true)
      if (range != null) {
        var index = range.index + range.length;
        quill.insertEmbed(index, 'image', image.src);
        quill.insertText(index + 1, ' ');
        quill.setSelection(index + 2);
        setLatex('')
        setVisible(false)
      }
    });
    return
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
      onOk={_saveLatex}
      onCancel={() => setVisible(false)}
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
          modules={{ toolbar: null }}
          style={{
            margin: 'auto',
            width: 'fit-content',
            height: 'auto',
            maxWidth: '100%',
            padding: '0 !important'
          }}
          onChange={setContent}
        ></ReactQuill>}
    </Modal>
  }
  return (
    <Layout title={'QuillDemo'}>
      {renderFormula()}
      <ReactQuill
        theme="snow"
        ref={quillRef}
        id="quill"
        style={{ height: 'calc(100vh - 202px)', marginTop: 15 }}
        onChange={setContent}
        modules={modules}
      >
      </ReactQuill>
    </Layout >
  )
}

export default QuillDemo