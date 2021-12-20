import { createRouter, createWebHashHistory } from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

const routes = [
  { // 登录
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false } // 标识进入该页面前是否需要登录
  },
  { // 父路由 底部标签栏
    path: '/', // 根页面
    // name: 'layout', // 如果父路由有默认子路由，无需设置name
    meta: {
      keepAlive: true, // 设置页面是否需要使用缓存
      requiresAuth: false
    },
    component: () => import('@/views/layout'),
    children: [ // 子路由
      { // 登录
        name: 'home',
        path: '', // 默认子路由，只能有1个
        meta: {
          keepAlive: true, // 设置页面是否需要使用缓存
          requiresAuth: false
        },
        component: () => import('@/views/home')
      },
      { // 问答
        name: 'qa',
        path: '/qa', // 默认子路由
        meta: {
          keepAlive: true, // 设置页面是否需要使用缓存
          requiresAuth: false
        },
        component: () => import('@/views/qa')
      },
      { // 视频
        name: 'video',
        path: '/video', // 默认子路由
        meta: {
          keepAlive: true, // 设置页面是否需要使用缓存
          requiresAuth: false
        },
        component: () => import('@/views/video')
      },
      { // 我的
        name: 'my',
        path: '/my', // 默认子路由
        meta: {
          keepAlive: true, // 设置页面是否需要使用缓存
          requiresAuth: false
        },
        component: () => import('@/views/my')
      }
    ]
  },
  { // 搜索
    name: 'search',
    path: '/search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  { // 文章详情
    name: 'article',
    /**
     * `/:articlId` 表示动态路由，
     * 节点名`articlId`相当于通配符*，可接收任意内容
     * 节点名`articlId`可以随便起名，但最好是要有意义
     */
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    /**
     * 开启props传参，说白了就是把路由参数映射到组件的props数据中
     * 将路由参数`/:articlId` 自动设置为组件的props属性
     */
    props: true,
    meta: { requiresAuth: false }
  },
  { // 个人信息
    name: 'user-profile',
    path: '/user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  },
  { // 小智同学
    name: 'user-chat',
    path: '/user-chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true } // 进入IM前 需先登录
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 导航守卫（路由拦截器），判断页面的访问权限（是否需要登录）
 * to: 要访问的路由页面信息
 * from: 来自哪个页面的路由信息
 * next：可选参数，放行的标记，true（默认参数） 执行路由跳转，
 *       false 取消导航，适合在promise中使用
 * 返回值 Boolean：功能同next，存在next时，以next为准
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 校验登录状态
    if (store.state.user) {
      // 已登录, 则执行路由
      // next()
      // 这里调用return，让代码不往下执行，否则还要加增加else嵌套，不方便阅读
      return next()
    }

    // 未登录，则提示用户
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => {
      // 确认时, 跳转登录页
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).catch(() => {
      // 取消时，停止路由导航
      next(false)
    })
  } else {
    // 不需要登录的页面，直接放行过去
    next()
  }
})

export default router
