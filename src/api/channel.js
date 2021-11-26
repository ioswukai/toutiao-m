/**
 * 频道请求模块
 */
import { sendRequest } from '@/utils/request'

/**
 * 请求获取所有频道列表
 */
export const getAllChannels = params => {
  return sendRequest('/app/v1_0/channels', { params })
}

/**
 * 添加用户频道
 */
export const addUserChannel = data => {
  return sendRequest('/app/v1_0/user/channels', { data, method: 'PATCH' })
}
