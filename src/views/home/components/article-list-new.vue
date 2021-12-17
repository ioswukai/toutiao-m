<template>

  <common-page-list
    v-model="list"
    :finished="finished"
    :load-data-request="onLoad"
    :scroll-to-pre-position-when-activated="true"
    @reset-current-page="currentPage=''"
    @increase-current-page="currentPage=networkData.pre_timestamp"
    class="common-page-list" >

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
      currentPage: '', // 当前请求页吗
      finished: false // 控制数据 加载结束（没有更多了 ）状态的显隐
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
      // 是否还有更多数据
      this.finished = !this.networkData.pre_timestamp
      return this.networkData.results
    }
  }
}
</script>

<style scoped lang="less">
.common-page-list {
  height: 79vh;
}
</style>
