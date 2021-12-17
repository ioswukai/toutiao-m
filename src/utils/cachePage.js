// 导入数据容器，获取已缓存的页面
import store from '@/store'
// 导入router 获取当前页面路由
import router from '@/router'

class CachePages {
  // 构造器
  constructor () {
    // 需要被缓存的路由页面
    this.pages = [
      'LayoutIndex',
      'HomeIndex',
      'QAIndex',
      'VideoIndex',
      'MyIndex']
  }

  // 返回<keep-alive>所需的 include
  getInclude (component) {
    const stateCachePages = store.state.cachePages
    // 存在vNode
    if (component) {
      // 获取组件名
      const componentName = component.type.name
      if (this.pages.includes(componentName) === true &&
        stateCachePages.includes(componentName) === false) {
        store.commit('addCachePage', componentName)
        // 该组件需要被缓存 且之前未被缓存过，写入缓存
        console.log('组件', componentName, '被写入了缓存', '当前缓存数组 =', stateCachePages)
      }
    }
    return stateCachePages
  }

  // 返回<component>所需的 is
  getIs (component) {
    if (component) {
      // 获取组件名
      // const componentName = component.type.name
      // console.log('组件', componentName, '的is =', component)
    }
    return component
  }

  // 返回<component>所需的 key
  getKey (component) {
    let key = router.currentRoute.value.path
    if (component) {
      // 获取组件名
      const componentName = component.type.name
      // 处理子路由的映射
      key = this.handleRouteMap(key, componentName)
      // console.log('组件', componentName, '的key =', key)
    }
    return key
  }

  /**
   * 处理子路由的映射
   * 防止子路由间相互切换时，currentRoute.path更改，
   * 导致页面渲染时，父路由绑定的key也被同步更改，
   * 因此切换子路由时，会创建并渲染一个新的父路由组件
   * 解决办法是：
   * 将子路由的路径，都映射成父路由的路径
   */
  handleRouteMap (routePath, componentName) {
    // 处理LayoutIndex 父路由
    if (componentName === 'LayoutIndex' &&
      ['/', '/qa', '/video', '/my'].includes(routePath)) {
      routePath = '/'
    }

    // 处理其他父路由
    return routePath
  }
}

export default new CachePages()
