<template>
  <div id="app">
    <!-- 一级路由的出口 -->
<!--    <router-view />-->
    <!-- vue3.0写的 -->
    <router-view v-slot="{ Component }">
      <!-- 此处的keep-alive
         1. 只缓存所有一级路由的组件状态
         2. 二级路由（首页/问答/视频/我的）间的切换时没有缓存的
            所以在二级路由出口处，也需要包裹keep-alive
       -->
<!--      <keep-alive>-->
<!--        <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive"/>-->
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
  </div>
</template>

<script>
import cachePage from '@/utils/cachePage'

export default {
  name: 'App',
  data () {
    return {
      cachePage: cachePage
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less"></style>
