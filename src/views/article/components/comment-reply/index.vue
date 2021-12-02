<template>
  <div class="comment-reply">
    <comment-item
      :comment="comment"
      :reply="false"
    />
    <van-cell title="全部评论" />

    <!--全部评论回复列表-->
    <comment-list
      ref="comment-list"
      :isArticleCommemtList="false"
      :source="comment.com_id"
      @click-reply="onReplyComment"
    />

    <!--写评论-->
    <comment-footer
      :comment="comment"
      @write-comment="isPostShow = true"
    />

    <!-- 对评论 回复
       position="bottom" 从底部弹出
       -->
    <van-popup
      v-model:show="isPostShow"
      position="bottom"
    >
      <comment-post
        v-if="isPostShow"
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostOrReplyCommentSuccess"
      />
    </van-popup>

    <!-- 对评论的评论 回复-->
    <van-popup
      v-model:show="isReplyShow"
      position="bottom"
    >
      <comment-post
        v-if="isReplyShow"
        :target="this.toReplyComment.com_id"
        :article-id="articleId"
        @post-success="onPostOrReplyCommentSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '../comment-item'
import CommentList from '../comment-list'
import CommentFooter from './comment-footer'
import CommentPost from '../comment-post'
import Network from '@/globalConfig/network.js'

export default {
  name: 'CommentReply',
  components: { CommentPost, CommentFooter, CommentList, CommentItem },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: Network.routeParamsProp
  },
  data () {
    return {
      isPostShow: false, // 控制写评论弹框的显隐
      isReplyShow: false, // 控制回复评论弹框的显隐
      toReplyComment: {} // 待回复的评论
    }
  },
  emits: {
    'reply-success': null
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onReplyComment (comment) {
      // 记录comment对象，传给回复评论弹框
      this.toReplyComment = comment
      // 显示回复评论弹框
      this.isReplyShow = true
    },

    onPostOrReplyCommentSuccess () {
      // 关闭弹框
      this.isPostShow = false
      this.isReplyShow = false

      // 将发布内容显示到列表顶部 刷新评论
      this.$refs['comment-list'].onRefresh()
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply {
}
</style>
