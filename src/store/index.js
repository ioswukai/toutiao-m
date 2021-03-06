import { createStore } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import ConstKey from '@/globalConfig/constKey.js'

export default createStore({
  // 初始化数据
  state: {
    // 一个对象，存储用户信息，包含token和refreshToken等数据
    // 本地存储操作，封装进storage类中
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(ConstKey.storageKey.user),
    // 搜索历史列表
    searchHistorys: getItem(ConstKey.storageKey.searchHistorys) || [],
    // 缓存页面列表，程序运行时，动态控制
    cachePages: []
  },
  // 修改数据，永远通过mutations修改数据，可响应式
  mutations: {
    // 定义一个mutations函数，
    // 其第一个参数时是固定的，为state，
    // 这是Vuex的规则
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，
      // 我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(ConstKey.storageKey.user, state.user)
    },
    // 设置搜索历史列表
    setSearchHistorys (state, data) {
      state.searchHistorys = data
      setItem(ConstKey.storageKey.searchHistorys, state.searchHistorys)
    },
    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const idx = state.cachePages.indexOf(pageName)

      if (idx !== -1) {
        state.cachePages.splice(idx, 1)
      }
    },
    // 移除所有缓存页面
    removeAllCachePages (state) {
      state.cachePages.length = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
