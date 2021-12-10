<template>
  <common-page-list
    v-model="list"
    :finished="finished"
    :load-data-request="onLoad"
    @reset-current-page="currentPage=1"
    @increase-current-page="currentPage++"
    class="search-result scroll-y-container" >

    <article-item
      v-for="(article, index) in list"
      :key="index"
      :article="article"
    />

  </common-page-list>
</template>

<script>
import { getSearchResult } from '@/api/search'
import CommonPageList from '@/components/common-page-list'
import ArticleItem from '@/components/article-item'

export default {
  name: 'SearchResult',
  components: {
    CommonPageList,
    ArticleItem
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [], // 表格是数据源
      networkData: null, // 网络请求返回的结果
      currentPage: 1, // 当前请求页吗
      finished: false // 控制数据 加载结束（没有更多了 ）状态的显隐
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getSearchResult({
        page: this.currentPage, // 页数
        per_page: 20, // 每页数量
        q: this.searchText // 搜索关键词
      })
      this.networkData = data.data
      // 是否还有更多数据
      this.finished = !data.data
      return this.networkData.results
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
}
</style>
