import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态设置REM的基准值
import 'amfe-flexible'
// vue3中，导入handleRelativeTime 方法
import { handleRelativeTime } from './utils/dayjs'
// vue2中，导入relativeTime 过滤器
// import './utils/dayjs'

const app = createApp(App)
// 定义全局属性
app.config.globalProperties.$filters = {
  relativeTime (value) {
    return handleRelativeTime(value)
  }
}
app.use(store).use(router).use(Vant).mount('#app')
