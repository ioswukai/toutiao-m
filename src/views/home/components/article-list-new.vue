<template>

  <common-page-list
    v-model="list"
    :load-data-request="onLoad"
    @reset-current-page="currentPage=''"
    @increase-current-page="currentPage=networkData.pre_timestamp"
    height="79vh" >

    <article-item
      v-for="(article, index) in list"
      :key="index"
      :article="article"
    />

  </common-page-list>

</template>

<script>
import { getArticles } from '@/api/article'
import CommonPageList from '@/components/common-page-list'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleListNew',
  components: {
    CommonPageList,
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 表格是数据源
      networkData: null, // 网络请求返回的结果
      currentPage: '' // 当前请求页吗
    }
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
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        // 请求数据的页码
        // 第一页是当前时间戳 Date.now()
        // 后面页数，由接口返回 接口有点坑，初始的数据也不是Date.now(),
        // 初始的数据写死成 1556789000001 即可
        // const timestamp = isRefreshAction ? Date.now() : this.preTimeStamp
        timestamp: this.currentPage || '1556789000001',
        with_top: '1' // 是否包含置顶文章
      })
      this.networkData = data.data
      return this.networkData.results
    }
  }
}
</script>

<style scoped lang="less">

</style>
