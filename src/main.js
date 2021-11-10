import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态设置REM的基准值
import 'amfe-flexible'

createApp(App).use(store).use(router).use(Vant).mount('#app')
