import axios from '@/utils/myaxios.js'
// 登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 获取文章列表
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 分页列表
export const Pagination = (params) => {
  return axios({
    method: 'get',
    url: '/list',
    params
  })
}
