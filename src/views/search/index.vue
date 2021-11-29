<template>
  <div class="search-container">
    <!-- 搜索栏
      在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
    -->
    <form action="/">
      <!--
      @search: 点击搜索按钮或enter时 触发
      @cancel: 点击取消按钮时 触发
      @focus: 点击输入框获得焦点时 触发
       -->
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3196fa"
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!--搜索结果-->
    <search-result
      v-if="isResultShow"
      :searchText="searchText"
    />
    <!--搜索结果-->

    <!--联想建议
    :searchText="searchText" 将搜索内容传递给子组件
    -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!--联想建议-->

    <!--历史记录-->
    <search-history
      v-else
    />
    <!--历史记录-->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
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
    onSearch (val) {
      // 当点击联想建议，搜索时，更改文本框内容
      this.searchText = val
      // 显示搜索结果
      this.isResultShow = true
    },

    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">

// 导航栏
:deep(.van-search__action) {
  color: white;
  background-color: #3196fa;
}

</style>
