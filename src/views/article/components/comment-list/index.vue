<template>
  <common-page-list
    class="comment-list"
    v-model="list"
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
    source: Network.routeParamsProp
  },
  data () {
    return {
      list: [], // 表格是数据源
      networkData: null, // 网络请求返回的结果
      offset: null // 获取下一页数据的标记
    }
  },
  emits: {
    updateTotalCommentCount: null
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论的类型 a:对文章的评论 c:对评论的回复
        source: this.source, // 源id，文章id或评论id
        /**
         * 获取评论数据的偏移量，值为评论id，
         * 表示从此id后取，
         * 不传表示从第一页开始读取数据
         */
        offset: this.offset,
        limit: 10 // 获取评论数据的个数，不传采用服务器设定的默认每页数据量
      })
      this.networkData = data.data
      // 通知父组件，更新评论总数
      this.$emit('updateTotalCommentCount', this.networkData.total_count)
      return this.networkData.results
    }
  }
}
</script>

<style scoped lang="less">

</style>
