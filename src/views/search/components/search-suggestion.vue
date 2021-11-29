<template>
  <div class="search-suggestion scroll-container-height">
    <van-cell
      icon="search"
      v-for="(text, idx) in suggestions"
      :key="idx"
    >
      <template #title>
        <span class="search-text">{{text}}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import debounce from 'lodash/debounce'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  emits: {},
  computed: {},
  watch: {
    searchText: {
      // 当searchText 发生改变的时候，就会调用handler 函数
      // 注意：handler 函数名是固定的
      // handler (val) {
      //   this.loadSearchSuggestions(val)
      // },
      // 对请求调用做防抖优化 延时300ms
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 300),
      // 使handler回调，在监听开始之后立即被调用
      // 以修复，第一次输入的内容，因组件未创建而无法被监听的bug
      immediate: true
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async loadSearchSuggestions (val) {
      const { data } = await getSearchSuggestions({
        q: val
      })
      this.suggestions = data.data.options
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
}
</style>
