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
  </div>
</template>

<script>
import CommentItem from '../comment-item'
import CommentList from '../comment-list'
export default {
  name: 'CommentReply',
  components: { CommentList, CommentItem },
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
    'reply-success': null
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onReplyComment () {
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply {
}
</style>
