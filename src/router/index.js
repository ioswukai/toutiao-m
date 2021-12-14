import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { // 登录
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  { // 父路由 底部标签栏
    path: '/', // 根页面
    // name: 'layout', // 如果父路由有默认子路由，无需设置name
    meta: {
      keepAlive: true // 设置页面是否需要使用缓存
    },
    component: () => import('@/views/layout'),
    children: [ // 子路由
      { // 登录
        name: 'home',
        path: '', // 默认子路由，只能有1个
        meta: {
          keepAlive: true // 设置页面是否需要使用缓存
        },
        component: () => import('@/views/home')
      },
      { // 问答
        name: 'qa',
        path: '/qa', // 默认子路由
        meta: {
          keepAlive: true // 设置页面是否需要使用缓存
        },
        component: () => import('@/views/qa')
      },
      { // 视频
        name: 'video',
        path: '/video', // 默认子路由
        meta: {
          keepAlive: true // 设置页面是否需要使用缓存
        },
        component: () => import('@/views/video')
      },
      { // 我的
        name: 'my',
        path: '/my', // 默认子路由
        meta: {
          keepAlive: true // 设置页面是否需要使用缓存
        },
        component: () => import('@/views/my')
      }
    ]
  },
  { // 搜索
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
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
    props: true
  },
  { // 个人信息
    name: 'user-profile',
    path: '/user-profile',
    component: () => import('@/views/user-profile')
  },
  { // 小智同学
    name: 'user-chat',
    path: '/user-chat',
    component: () => import('@/views/user-chat')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
