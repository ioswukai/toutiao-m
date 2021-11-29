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
    component: () => import('@/views/layout'),
    children: [ // 子路由
      { // 登录
        name: 'home',
        path: '', // 默认子路由，只能有1个
        component: () => import('@/views/home')
      },
      { // 问答
        name: 'qa',
        path: '/qa', // 默认子路由
        component: () => import('@/views/qa')
      },
      { // 视频
        name: 'video',
        path: '/video', // 默认子路由
        component: () => import('@/views/video')
      },
      { // 我的
        name: 'my',
        path: '/my', // 默认子路由
        component: () => import('@/views/my')
      }
    ]
  },
  { // 搜索
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
