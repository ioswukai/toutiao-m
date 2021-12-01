<template>
  <!--
  :class 绑定动态样式
  @click.stop 阻止单击事件继续冒泡
  -->
  <van-button
    style="border: unset"
    :icon="collectedState ? 'star' : 'star-o'"
    :loading="loading"
    @click.stop="onCollect"
  >
  </van-button>
</template>

<script>
import Network from '@/globalConfig/network'
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  components: {},
  props: {
    // 是否关注
    isCollected: {
      type: Boolean,
      default: false
    },
    articleId: Network.routeParamsProp
  },
  data () {
    return {
      collectedState: false, // 父类的isCollected不可更改，为了方便引入自身属性
      loading: false // 控制按钮是否可以点击
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
    this.collectedState = this.isCollected
  },
  mounted () {
  },
  methods: {
    async onCollect () {
      // 显示加载
      this.loading = true

      // 发起请求
      const target = this.articleId
      try {
        // 外面包裹一层try 防止js报错，后面取消loading的代码无法执行
        if (this.collectedState) {
          // 已关注，执行取消关注操作
          await deleteCollect(target)
        } else {
          // 未关注，执行关注操作
          await addCollect({ target })
        }
        // 更新UI
        this.collectedState = !this.collectedState
        this.$toast.success(this.collectedState ? '收藏成功' : '取消收藏成功')
      } catch (err) {}

      // 取消加载显示
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-icon-star-o) {
  color: #666;
}
:deep(.van-icon-star) {
  color: orange;
}
</style>
