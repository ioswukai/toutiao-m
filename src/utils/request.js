/**
 * 封装 axios 请求模块
 */

import axios from 'axios'

// axios.create 复制一个 axios实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 基础路径
})

export default request
