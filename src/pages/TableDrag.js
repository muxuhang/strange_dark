import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.css';
import './../components/quill/quill.css';
// 功能
// 1、只能竖直方向移动
// 2、移动时显示插入位置
const TableDrag = () => {
  const tbodyRef = useRef()
  const [currentKey, setCurrentKey] = useState(null)
  const [list, setList] = useState([
    { title: '济南', sort: 1 },
    { title: '青岛', sort: 2 },
    { title: '烟台', sort: 3 },
    { title: '菏泽', sort: 4 },
    { title: '德州', sort: 5 }])
  const [moveKey, setMoveKey] = useState(null)
  const onDragEnd = async () => {
    const result = [...list]
    // result[currentKey] = result.splice(moveKey, 0, result[currentKey])[0]
    console.log(result.splice(currentKey,));
    // setList(list)
    console.log(result);
    setCurrentKey(null)
    setMoveKey(null)
  }
  const onDragOver = (e) => {
    setMoveKey(e.target.parentNode.id)
    return e.preventDefault()
  }
  const onDragStart = (e) => {
    setCurrentKey(e.target.id)
  }
  const style = currentKey >= moveKey ? {
    borderTop: '2px dashed #999',
  } : {
    borderBottom: '2px dashed #999',
  }
  return (
    <Layout title={'TableDrag'}>
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>标题</td>
            <td>创建时间</td>
          </tr>
        </thead>
        <tbody ref={tbodyRef} onDragOver={onDragOver}>
          {list.map((item, index) => <tr
            key={index}
            id={index}
            style={{
              cursor: 'move',
              background: "#fff",
              height: 40,
              ...(moveKey == index && currentKey != moveKey && currentKey != null && moveKey != null) ? style : {}
            }}
            draggable={true}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>-----</td>
          </tr>)}
        </tbody>
      </table>
    </Layout >
  )
}

export default TableDrag
