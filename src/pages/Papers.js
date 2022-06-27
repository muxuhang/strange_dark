import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import 'katex/dist/katex.css';
import './../components/quill/quill.css';
import MQuill from "../components/quill/quill";
import { Button, Card, Col, Grid, Row } from "antd";
import network from "../utils/network";
import { PlusCircleOutlined } from "@ant-design/icons";
// 固定样式 大标题、小标题、分类标题、题目，内容(完成)
const Papers = () => {
  const paperRef = useRef()
  const [papers, setPapers] = useState({
    title: "",
    body: []
  })
  const [questions, setQuestions] = useState([])
  const changePaper = (value, type) => {
    setPapers({
      ...papers,
      [type]: value
    })
  }
  useEffect(() => {
    getQustions()
  }, [])
  const getQustions = () => {
    network({
      api: '/questions/'
    }).then((res) => {
      if (res.success) {
        setQuestions(res.data)
      }
    })
  }
  const insertQuestion = (item) => {
    const body = papers.body
    body.push(item)
    changePaper(body, 'body')
  }
  const renderPaperItem = (item, index) => {
    return <Card
      style={{
        marginBottom: 10,
        position: 'relative',
        cursor: "pointer",
        border: 'none',
        hover: {
          border: '1px solid black'
        }
      }}
      key={index.toString()}>
      <MQuill
        theme='bubble'
        data={item.question || '空数据'}
        disabled></MQuill>
      {item.question_type == 'radio' || item.question_type == 'choise' ? <div>
        {item.options.options.map((row, key) => {
          return <Row>
            <Col style={{ padding: "12px 0", lineHeight: '16px' }}>A、</Col>
            <Col flex={1} style={{ padding: 0 }}>
              <MQuill
                key={key}
                theme='bubble'
                data={row.option || '空数据'}
                disabled></MQuill>
            </Col>
          </Row>
        })}
        <Button type='link'><PlusCircleOutlined /></Button>
      </div> : null}
      <div style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1, top: 0 }}></div>
    </Card>
  }
  const questionList = () => {
    return <Card className="read_quill" style={{ height: '100%', padding: 10 }}>
      {questions.map((item, index) => <Card
        style={{
          marginBottom: 10,
          position: 'relative',
          cursor: "pointer"
        }}
        onClick={() => insertQuestion(item)}
        key={index.toString()}>
        <MQuill
          theme='bubble'
          style={{}}
          data={item.question || '空数据'}
          disabled></MQuill>
        <div style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1, top: 0 }}></div>
      </Card>)}
    </Card>
  }
  return (
    <Layout title={'Paper'}>
      <Row style={{ width: 1200, marginTop: 20 }}>
        <Col style={{ width: 800 }}>
          <Card className="read_quill" style={{ height: 'calc(100vh - 172px)', padding: 10, overflowY: 'auto' }}>
            {papers.body.map((item, index) => renderPaperItem(item, index))}
          </Card>
        </Col>
        <Col style={{ width: 380, marginLeft: 20 }}>
          {questionList()}
        </Col>
      </Row>
    </Layout >
  )
}

export default Papers
