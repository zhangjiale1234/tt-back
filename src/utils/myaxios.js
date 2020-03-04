// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 导出axios
export default axios

// 添加拦截器
axios.interceptors.request.use(

  config => {
    const token = localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
