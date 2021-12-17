<template>
  <div class="layout-container">
    <!-- 二级路由的出口 -->
<!--    <router-view/>-->
    <router-view v-slot="{ Component }">
      <!-- 此处的keep-alive
         1. 缓存所有二级路由（首页/问答/视频/我的）的组件状态
       -->
<!--      <keep-alive>-->
<!--        <component :is="Component" :key="$route.path"  v-if="$route.meta.keepAlive"/>-->
<!--      </keep-alive>-->
<!--      <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive"/>-->
      <!-- route.meta.keepAlive 控制组件的缓存不灵活
             实现运行时动态控制组件的缓存/取消缓存比较麻烦
             推荐使用：：`keep-alive`的`include`或`exclude`属性，
                        传递元素为组件名（非路由名）的`vuex`容器数组，
        -->
      <keep-alive :include="cachePage.getInclude(Component)">
        <component :is="cachePage.getIs(Component)" :key="cachePage.getKey(Component)" />
      </keep-alive>
    </router-view>

    <!-- 标签栏
    route:开启路由
    to属性自动选中对应的标签
    -->
    <van-tabbar class="layout-tab" route>
      <van-tabbar-item icon="home-o" to="/" >
        <span class="text">首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa" >
        <span class="text">问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video" >
        <span class="text">视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my" >
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
        <template #icon>
          <i class="toutiao toutiao-wode"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import cachePage from '@/utils/cachePage'

export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      cachePage: cachePage
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tab {
    // 根据 标签名+class类名 toutiao，设置样式
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
