<template>
  <!--
  :class 绑定动态样式
  @click.stop 阻止单击事件继续冒泡
  -->
  <van-button
    style="border: unset"
    :icon="likedState ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click.stop="onLike"
  >
  </van-button>
</template>

<script>
import Network from '@/globalConfig/network'
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  components: {},
  props: {
    // 是否关注
    isLiked: {
      type: Boolean,
      default: false
    },
    articleId: Network.routeParamsProp
  },
  data () {
    return {
      likedState: false, // 父类的isLiked不可更改，为了方便引入自身属性
      loading: false // 控制按钮是否可以点击
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
    this.likedState = this.isLiked
  },
  mounted () {
  },
  methods: {
    async onLike () {
      // 显示加载
      this.loading = true

      // 发起请求
      const target = this.articleId
      try {
        // 外面包裹一层try 防止js报错，后面取消loading的代码无法执行
        if (this.likedState) {
          // 已关注，执行取消关注操作
          await deleteLike(target)
        } else {
          // 未关注，执行关注操作
          await addLike({ target })
        }
        // 更新UI
        this.likedState = !this.likedState
        this.$toast.success(this.likedState ? '点赞成功' : '取消点赞成功')
      } catch (err) {}

      // 取消加载显示
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-icon-good-job-o) {
  color: #666;
}
:deep(.van-icon-good-job) {
  color: orange;
}
</style>
