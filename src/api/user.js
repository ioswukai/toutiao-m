/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码
 * 每个手机每分钟只能发送1次
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 很多接口都需要授权，因此在utils/request中设置请求拦截器，统一添加
    // // 发送请求头
    // headers: {
    //   // 注意，该接口需要授权才能访问
    //   // token的格式：Bearer token数据，注意Bearer后有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
