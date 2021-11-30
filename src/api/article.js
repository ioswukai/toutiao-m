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
