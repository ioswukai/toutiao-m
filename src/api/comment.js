/**
 * 评论请求模块
 */
import { sendRequest } from '@/utils/request'

/**
 * 获取文章评论列表
 */
export const getComments = params => {
  return sendRequest('/app/v1_0/comments', { params })
}
