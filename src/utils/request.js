/**
 * 封装 axios 请求模块
 */

import axios from 'axios'
import store from '@/store'

// axios.create 复制一个 axios实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 基础路径
})

// 请求拦截器 这里axios 需要换成request
// axios.interceptors.request.use(
request.interceptors.request.use(
  config => {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象
    const { user } = store.state
    if (user && user.token) {
      // 设置请求头的 token
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 注意：这里务必要返回 config配置对象
    // 否则请求就停在这里出不去
    return config
  },
  error => {
    // 如果请求出错了（还没有发出去）会进入这里
    return Promise.error(error)
  })

// 响应拦截器
export default request
