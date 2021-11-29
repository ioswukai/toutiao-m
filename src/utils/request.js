/**
 * 封装 axios 请求模块
 */

// 导入网络引擎
import axios from 'axios'
// 导入数据容器，获取用户信息
import store from '@/store'
// 处理大整数
import jsonBig from 'json-bigint'
// 在页面顶部展示消息提示，支持函数调用
import { Notify } from 'vant'
// 导入router 用于跳转登录
import router from '@/router'
import Network from '@/globalConfig/network.js'

// axios.create 复制一个 axios实例
const request = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net/' // 基础路径
  baseURL: Network.host // 基础路径
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

/**
 * 转换响应结果 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [function (data) {
  try {
    // 使用json-bigint解析
    return jsonBig.parse(data)
  } catch (err) {
    // 解析失败，返回原始数据
    return data
  }
}]

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 网络请求正常，则直接返回响应的数据即可
    return response
  },
  async error => {
    // 网络请求失败 且错误码是401
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user

      if (!user || !user.refresh_token) {
        // 用户未登录，或刷新用的token没有值 则跳转登录页面
        // 直接push不好，如果登录页换目录路径了，就会出现问题
        // router.push('/login')
        redirectLogin()
        // 并且，代码不要往后执行了
        return
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
        /**
         * 获取token需新建axios实例
         * 若还用原来request实例，仍会启动响应拦截器，这样如果
         * 刷新token请求也报错401，就会导致无限递归，即死循环了
         */
        const res = await axios({
          method: 'PUT',
          url: 'http://api-toutiao-web.itheima.net/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        /**
         * 如果获取成功，则把新的 token 更新到容器中
         * 因为没有返回用户其他信息，所以...user使用原来的信息即可
         */
        store.commit('setUser', {
          ...user,
          token: res.data.data.token // 覆盖设置为 最新获取的可用 token
        })

        /**
         * 把之前失败的用户请求 继续发出去 ！！！
         * request响应返回的 data或error对象，
         * 会包含请求所有的信息例如 url、method 都有，
         * 他们都在data.config或error.config对象中
         *
         * request(error.config) 就新建了一个请求，
         * 来替代原来发送的请求
         *
         * return 把新request的请求结果，
         * 继续返回给原请求的发送对象
         */
        return request(error.config)
      } catch (err) {
        // 如果获取最新token失败，直接跳转 登录页
        console.log('请求刷线 token 失败', err)
        // router.push('/login')
        redirectLogin()
      }
    } else {
      // 统一处理 其他错误请求的交互
      Notify('服务端异常，请稍后重试')
    }
    // 把报错信息 抛出给请求调用方
    return Promise.reject(error)
  }
)

function redirectLogin () {
  /**
   * replace替换当前页面，效果同`router.push()`，但它不会形成历史记录，无法返回
   *
   * 对于登录页面，我们并不希望用户能够回退返回
   */
  router.replace({
    name: 'login',
    /**
     * 是一个对象类型，可用于在当前路由跳转前，记录当前路由
     * 的路径`router.currentRoute.fullPath`，
     * 方便后续`router.push()`返回时跳转到当前路由，
     *
     * query对象里面的`key`属性随便写，只要不重复就行；
     */
    query: {
      /**
       * redirect 自定义的 用于记录当前路径的key
       * 后续使用this.$router.query.redirect
       * 可以拿到此处记录的路由路径
       */
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 *
 * @param url 网址
 * @param method 请求方法
 * @param params Query中的请求参数
 * @param data Body中的请求参数
 * @return {AxiosPromise} 发送实际的请求
 */
export function sendRequest (
  url,
  {
    method = 'GET',
    params = {},
    data = {}
  } = {}) {
  // 请求的配置对象 赋值属性
  const requestConfig = {}
  requestConfig.url = url
  requestConfig.method = method
  requestConfig.data = data
  requestConfig.params = params

  /** 发请求 request返回的是用一个Promise对象 所以可用await */
  return request(requestConfig)
}

/** 默认导出 */
export default request
