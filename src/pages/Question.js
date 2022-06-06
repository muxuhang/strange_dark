import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.css';
import './../components/quill/quill.css';
import MQuill from "../components/quill/quill";
import { Button, Card, Col, Divider, Grid, Modal, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import network from "../utils/network";
const { Title } = Typography;
const defaultForm = {
  question: '',
  question_type: 'radio',
  options: {
    symbol: 'letter',//number
    correct: 0,
    options: [{
      option: ''
    }, {
      option: ''
    }, {
      option: ''
    }, {
      option: ''
    }]
  }
}
const Question = () => {
  const [form, setForm] = useState(defaultForm)
  const [questions, setQuestions] = useState([])
  const [types, setTypes] = useState([])
  useEffect(() => {
    getQustions()
    getOptions()
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
  const getOptions = () => {
    const res = [
      { title: '单选题', type: 'radio' },
      { title: '多选题', type: 'choise' },
      { title: '填空题', type: 'fill' },
      { title: '完形填空', type: 'cloze_test' },
      { title: '阅读理解', type: 'read' }
    ]
    setTypes(res)
  }
  const onChange = (e, type) => {
    const res = {
      ...form,
      [type]: e
    }
    setForm(res)
  }
  const onSave = () => {
    const api = form._id ?
      '/questions/update/' :
      '/questions/'
    network({
      method: "POST",
      api: api,
      data: form
    }).then((res) => {
      getQustions()
      setOpen(false)
    })
  }
  const deleteItem = (id) => {
    Modal.error({
      title: '确认删除?',
      content: '删除后无法恢复',
      okText: "确认",
      maskClosable: true,
      onOk: () => {
        onDelete(id)
      }
    })
  }
  const onDelete = (id) => {
    if (!id) return
    network({
      method: "DELETE",
      api: '/questions/',
      data: {
        id: id
      }
    }).then((res) => {
      getQustions()
    })
  }
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setForm(null)
      }, 500);
    }
  }, [open])
  const questionModal = () => {
    return <Modal
      visible={open}
      width={1200}
      title={form._id ? '编辑' : '创建'}
      onCancel={() => { setOpen(false) }}
      onOk={onSave}>
      <Row>
        <Col flex={1}>
          <Select
            placeholder='选择试题'
            defaultValue={form.question_type}
            onChange={(e) => onChange(e, 'question_type')}>
            {types.map((item, index) => <Select.Option
              key={index.toString()}
              value={item.type}>{item.title}</Select.Option>)}
          </Select>
        </Col>
      </Row>
      <MQuill
        style={{ height: 320 }}
        data={form.question}
        setData={e => onChange(e, 'question')}></MQuill>
      <Row gutter={12}>
        {form.question_type == 'radio' || form.question_type == 'choise' ?
          form.options &&
          form.options.options &&
          form.options.options.map((item, index) =>
            <Col span={12} style={{ marginTop: 12 }} key={index.toString()}>
              <MQuill
                style={{ height: 160, overflow: "scroll" }}
                container={[
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'script': 'sub' }, { 'script': 'super' }],
                  ['image', 'formula']
                ]}
                data={item.option}
                setData={e => {
                  const options = form.options
                  options.options[index].option = e
                  onChange(options, 'options')
                }}></MQuill>
            </Col>
          ) : null}
      </Row>
    </Modal>
  }
  const questionList = () => {
    return <div className="read_quill">
      {questions.map((item, index) => <Card
        style={{
          marginTop: 10,
        }}
        key={index.toString()}>
        <Row style={{ padding: 5 }}>
          <Col
            flex={1}
            style={{
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={async () => {
              await setForm(item)
              setOpen(true)
            }}>
            <MQuill
              theme='bubble'
              data={item.question || '空数据'}
              disabled></MQuill>
            <div style={{ position: 'absolute', zIndex: 1, height: '100%', width: '100%', top: 0 }}></div>
          </Col>
          <Col>
            <Button size="small" type='link' danger onClick={() => deleteItem(item._id)}>删除</Button>
          </Col>
        </Row>
      </Card>)}
    </div>
  }
  return (
    <Layout title={'question'}>
      {form ? questionModal() : null}
      <Row>
        <Col flex={1}></Col>
        <Col><Button onClick={async () => {
          await setForm(defaultForm)
          setOpen(true)
        }}>创建</Button></Col>
      </Row>
      {questionList()}
    </Layout>
  )
}

export default Question
