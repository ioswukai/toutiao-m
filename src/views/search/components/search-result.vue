<template>
  <div class="search-result scroll-y-container">
    <van-cell>
      <template #title>
        <span class="search-text">结果1</span>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <span class="search-text">结果2</span>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <span class="search-text">结果3</span>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <span class="search-text">结果4</span>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <span class="search-text">结果4</span>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <span class="search-text">结果4</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
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
.search-result {
}
</style>
