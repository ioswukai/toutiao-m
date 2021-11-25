/**
 * 频道请求模块
 */
import { sendRequest } from '@/utils/request'

/**
 * 请求获取所有频道列表
 */
export const getAllChannels = params => {
  return sendRequest('/app/v1_0/channels', false, params)
}
