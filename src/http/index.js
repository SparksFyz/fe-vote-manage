import axios from 'axios';
import QS from 'qs'

const PREFIX_URL = 'http://huwaicanju.com/Wechat/user'

axios.interceptors.request.use(config => {
  //这里可以做loading show处理
  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

const checkStatus = response => {
  //这里可以做loading hide处理
  if (response.status === 200 || response.status === 304) {
    return response.data
  }
  //这里做服务器错误处理(可以引入第三方showMessage组件) 
  alert('服务器错误,错误状态码为:' + response.status);
  return {
    code: response.status,
    message: response.statusText,
    data: response.statusText,
  }
}

const checkCode = res => {
  if (!res.success) {
    //这里做后端返回数据错误处理(可以引入第三方showMessage组件) 
    alert('后端错误,错误状态码为:' + res.msg);
  }
  return res
}

const post = (url, data) => {
  !(data instanceof FormData) && (data = QS.stringify(data))
  return axios({
    method: 'post',
    url: `${PREFIX_URL}/${url}`,
    data: QS.stringify(data),
    timeout: 30000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then(checkStatus).then(checkCode)
}

const get = (url, params) => {
  return axios({
    method: 'get',
    url: `${PREFIX_URL}/${url}`,
    params,
    timeout: 30000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(checkStatus).then(checkCode)
};

export {
  post,
  get
}
