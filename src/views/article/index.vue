<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

  </div>
</template>

<script>
import Network from '@/globalConfig/network.js'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: Network.routeParamsProp
  },
  data () {
    return {}
  },
  emits: {},
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
.article-container {
}
</style>
