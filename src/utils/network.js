import Cookies from "js-cookie"

const apiUrl = 'http://127.0.0.1:3002/api'
const csrftoken = Cookies.get('csrftoken')
const network = async ({
  method = 'GET',
  api = "",
  headers = null,
  data = {},
  needToken = false,
  type = ''
}) => {
  let content = ''
  if (method == 'get' || method == 'GET' || method == 'head' || method == 'HEAD') {
    content = '?'
    const list = Object.keys(data)
    list.map((item, index) => {
      content = content +
        item +
        '=' +
        (data[item] ? data[item] : '') +
        ((index + 1 != list.length) ? '&' : '')
    })
  }
  // 如果参数为数字0，转换为字符串''
  if (method == 'post' || method == 'POST' || method == 'patch' || method == 'PATCH') {
    const list2 = Object.keys(data)
    list2.map((item) => {
      if (data[item] === 0 && item != 'duration') {
        data[item] = ''
      }
    })
  }

  const defaultHeaders = needToken ? {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRFToken': csrftoken,
  } : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  const url = `${apiUrl}${api}${content}`
  const props = {
    method: method,
    headers: headers ? { ...headers, 'X-CSRFToken': csrftoken } : defaultHeaders,
    body: content ? null : type == 'upload' ? data : JSON.stringify(data)
  }
  return fetch(url, props)
    .then((res) => res.json())
    .then((res) => {
      return ({ success: true, data: res })
    })
}

export default network;
