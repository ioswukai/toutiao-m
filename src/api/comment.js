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

/**
 * 对评论或评论回复点赞
 */
export const addCommentLike = data => {
  return sendRequest('/app/v1_0/comment/likings', { data, method: 'POST' })
}

/**
 * 取消对评论或评论回复点赞
 */
export const deleteCommentLike = commentId => {
  return sendRequest(`/app/v1_0/comment/likings/${commentId}`, { method: 'DELETE' })
}

/**
 * 发布文章的评论或评论回访
 */
export const addComment = data => {
  return sendRequest('/app/v1_0/comments', { data, method: 'POST' })
}
