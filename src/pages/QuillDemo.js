import React from "react"
import Layout from "../components/layout"
import MQuill from "../components/quill/quill";
const QuillDemo = () => {
  return (
    <Layout title={'QuillDemo'}>
      <MQuill
        data={null}
        style={{ height: 'calc(100vh - 202px)', marginTop: 15 }}></MQuill>
    </Layout >
  )
}

export default QuillDemo
