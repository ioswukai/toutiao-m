<template>
  <div class="comment-footer">
    <van-button
      class="comment-btn"
      type="default"
      round
      size="small"
      @click="$emit('write-comment')"
    >写评论</van-button>

    <like-article
      :isLiked="comment.is_liking"
      :target="comment.com_id"
      :isArticleLike="false"
    />

  </div>
</template>

<script>
import LikeArticle from '@/components/like-article'

export default {
  name: 'CommentFooter',
  components: { LikeArticle },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  emits: {
    'write-comment': null
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
.comment-footer {
  // 固定在底部
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  // flexbox
  display: flex;
  // 伸缩项目会平均分布在主轴线（水平）里，两端保留一半的空间
  justify-content: space-around;
  // 垂直居中
  align-items: center;
  // top边线的高度，应该总高度内
  box-sizing: border-box;
  border-top: 1px solid #d8d8d8;
  background-color: white;
  .comment-btn {
    width: 450px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    color: #333;
  }
}
:deep(.van-icon) {
  font-size: 40px;
  .van-info {
    font-size: 22px;
    background-color: #e22829;
  }
}
</style>
