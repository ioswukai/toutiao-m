<template>
  <div class="search-suggestion scroll-container-height">
    <van-cell
      icon="search"
      v-for="(text, idx) in suggestions"
      :key="idx"
      @click="$emit('search', text)"
    >
      <template #title>
<!--        需要高亮显示搜索文本 就不能这样写了-->
<!--        <span class="search-text">{{text}}</span>-->
        <!--  {{}} 双花括号绑定会直接输出纯文本内容，
        使用v-html属性，可以绑定渲染带有HTML标签的字符串-->
        <div class="search-text" v-html="highlight(text)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce, escapeRegExp } from 'lodash'

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
  emits: {
    search: null // 通知父组件，搜索 所点击的联想建议
  },
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
    },

    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      /**
       * `//gi`表示`//`表示正则表达式，且它中间的内容，
       *  都会被当作匹配字符来使用，而不是数据变量，
       *  所以不能写 `/this.searchText/`
       *  g表示全局替换，i表示替换时忽略大小写
       */
      // return text.replace(/this.searchText/gi, highlightStr)
      /**
       * 如果要根据数据变量，动态的创建正则表达式，则需手动new RegExp
       * RegExp 正则表达式的构造函数
       *  参数1：匹配模式字符串，它会根据这个字符串创建正则对象，
       *        它会计算this.searchText的值，得到该字符串
       *  参数2：匹配模式，要写到字符串中
       */
      // const reg = new RegExp(this.searchText, 'gi')
      /**
       * this.searchText中，如果包含关键字，如加号`c++`中的`+`需先转义
       * 使用lodash escapeRegExp 进行转义
       */
      const reg = new RegExp(escapeRegExp(this.searchText), 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  :deep(span.active) {
    color: #3296fa;
  }
}
</style>
