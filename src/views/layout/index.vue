<template>
  <div class="layout-container">
    <!-- 路由的出口 -->
    <router-view/>
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
        <span class="text">我的</span>
        <template #icon>
          <i class="toutiao toutiao-wode"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
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
