<template>
  <common-page-list
    class="comment-list"
    ref="common-page-list"
    v-model="list"
    :finished="finished"
    finishedText="已展示所有评论"
    overflowY="unset"
    :load-data-request="onLoad"
    @reset-current-page="offset = null"
    @increase-current-page="offset = networkData.last_id"
  >
    <comment-item
      v-for="(comment, index) in list"
      :key="index"
      :comment="comment"
      @click-reply="$emit('click-reply', comment)"
    />
  </common-page-list>
</template>

<script>
import CommonPageList from '@/components/common-page-list'
import { getComments } from '@/api/comment'
import Network from '@/globalConfig/network'
import CommentItem from '../comment-item'

export default {
  name: 'CommentList',
  components: { CommentItem, CommonPageList },
  props: {
    source: Network.routeParamsProp, // 源id，文章id或评论id
    isArticleCommemtList: { // 默认是文章评论列表，而非评论回复列表
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: [], // 表格是数据源
      networkData: null, // 网络请求返回的结果
      offset: null, // 获取下一页数据的标记
      finished: false // 控制数据 加载结束（没有更多了 ）状态的显隐
    }
  },
  emits: {
    updateTotalCommentCount: null,
    'click-reply': null
  },
  computed: {},
  watch: {},
  created () {
    /**
     * 修复 在comment-list组件渲染前
     * 评论列表组件，不发送onLoad请求，导致父组件
     * 文章详情的评论总数不显示的bug
     *
     * 解决办法，手动在created()中去发送一次请求
     */
    this.onLoad()
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      // 评论的类型 a:对文章的评论 c:对评论的回复
      const type = this.isArticleCommemtList ? 'a' : 'c'
      const { data } = await getComments({
        type,
        source: this.source.toString(), // 源id，文章id或评论id
        /**
         * 获取评论数据的偏移量，值为评论id，
         * 表示从此id后取，
         * 不传表示从第一页开始读取数据
         */
        offset: this.offset,
        limit: 10 // 获取评论数据的个数，不传采用服务器设定的默认每页数据量
      })
      this.networkData = data.data
      // 是否还有更多数据
      this.finished = !this.networkData.last_id
      // 通知父组件，更新评论总数
      this.$emit('updateTotalCommentCount', this.networkData.total_count)
      return this.networkData.results
    },

    onRefresh () {
      // 重新刷新列表
      this.$refs['common-page-list'].onRefresh()
    }
  }
}
</script>

<style scoped lang="less">

</style>
