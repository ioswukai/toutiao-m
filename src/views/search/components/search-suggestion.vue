<template>
  <div class="search-suggestion scroll-container-height">
    <van-cell icon="search">
      <template #title>
        <span class="search-text">搜索1</span>
      </template>
    </van-cell>
    <van-cell icon="search">
      <template #title>
        <span class="search-text">搜索2</span>
      </template>
    </van-cell>
    <van-cell icon="search">
      <template #title>
        <span class="search-text">搜索3</span>
      </template>
    </van-cell>
    <van-cell icon="search">
      <template #title>
        <span class="search-text">搜索4</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {},
  data () {
    return {}
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="less">
.search-suggestion {
}
</style>
