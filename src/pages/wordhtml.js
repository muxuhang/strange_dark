import React, { useEffect } from "react"
import Layout from "../components/layout"
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.css';
import './../components/quill/quill.css';
const WordHtml = () => {
  useEffect(() => {
    getFile()
  }, [])
  const getFile = () => {
    fetch('/content/blog/数学.docx')
      // .then(e => e.json())
      .then((res) => {
        console.log(res);
      })
  }
  return (
    <Layout title={'WordHtml'}>

    </Layout>
  )
}

export default WordHtml
