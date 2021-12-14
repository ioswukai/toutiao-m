/**
 * 全局配置的 网络请求相关信息
 */
export default {
  // 基础网址
  host: 'http://api-toutiao-web.itheima.net/',
  // 解决服务器跨域问题
  // host: '/api',
  /**
   * 动态路由，接收的路由参数，在组件props中的配置
   * 可能存在多种情况，所以写多种类型
   *
   * Number：组件 跳转过来的，是Number类型
   * Object：组件 跳转过来的，使用json-bigint解析后，是Object类型，
   * String: 直接输入网址 跳转过来的，是String类型
   */
  routeParamsProp: {
    type: [String, Number, Object],
    required: true
  }
}
