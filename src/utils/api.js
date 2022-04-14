import React, { useEffect, useRef, useState } from "react"
import { Modal } from "antd"

const _imageHandler = (quillRef, isUpload = false) => {
  const quillEditor = quillRef.current.getEditor()
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()
  input.onchange = async () => {
    const file = input.files[0]
    console.log(file)
    console.log(input.files)
    // const formData = new FormData()
    // formData.append('quill-image', file)
    // const res = await uploadFile(formData)
    // const range = quillEditor.getSelection()
    // const link = res.data[0].url

    return
    // quillEditor.insertEmbed(range.index, 'image', link)
  }
}

const api = {
  _imageHandler
}
export default api