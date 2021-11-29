/**
 * 文章搜索相关内容
 */
import { sendRequest } from '@/utils/request'

/**
 * 请求获取文章搜索 联系建议列表
 */
export const getSearchSuggestions = params => {
  return sendRequest('/app/v1_0/suggestion', { params })
}
