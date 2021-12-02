/**
 * 文章请求模块
 */
// import request, { sendRequest } from '@/utils/request'
import { sendRequest } from '@/utils/request'

// /**
//  * 请求获取文章列表数据
//  */
// export const getArticles = params => {
//   return request({
//     method: 'get',
//     url: '/app/v1_1/articles',
//     params
//   })
// }

/**
 * 请求获取文章列表数据
 */
export const getArticles = params => {
  return sendRequest('/app/v1_1/articles', { params })
}

/**
 * 获取文章详情
 */
export const getArticleById = articleId => {
  return sendRequest(`/app/v1_0/articles/${articleId}`)
}

/**
 * 收藏文章
 */
export const addCollect = data => {
  return sendRequest('/app/v1_0/article/collections', { data, method: 'POST' })
}

/**
 * 取消收藏
 */
export const deleteCollect = articleId => {
  return sendRequest(`/app/v1_0/article/collections/${articleId}`, { method: 'DELETE' })
}

/**
 * 点赞文章
 */
export const addLike = data => {
  return sendRequest('/app/v1_0/article/likings', { data, method: 'POST' })
}

/**
 * 取消文章点赞
 */
export const deleteLike = articleId => {
  return sendRequest(`/app/v1_0/article/likings/${articleId}`, { method: 'DELETE' })
}
