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
import { addCommentLike, deleteCommentLike } from '@/api/comment.js'

export default {
  name: 'LikeArticle',
  components: {},
  props: {
    // 是否关注
    isLiked: {
      type: Boolean,
      default: false
    },
    // 源id，文章id或评论id
    target: Network.routeParamsProp,
    isArticleLike: { // 默认是对文章点赞
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      likedState: this.isLiked, // 父类的isLiked不可更改，为了方便引入自身属性
      loading: false // 控制按钮是否可以点击
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
    async onLike () {
      // 显示加载
      this.loading = true

      // 源id，文章id或评论id
      const target = this.target.toString()
      try {
        // 外面包裹一层try 防止js报错，后面取消loading的代码无法执行
        if (this.likedState) {
          // 已关注，执行取消关注操作
          if (this.isArticleLike) {
            // 文章
            await deleteLike(target)
          } else {
            // 评论
            await deleteCommentLike(target)
          }
        } else {
          // 未关注，执行关注操作
          if (this.isArticleLike) {
            // 文章
            await addLike({ target })
          } else {
            // 评论
            await addCommentLike({ target })
          }
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
