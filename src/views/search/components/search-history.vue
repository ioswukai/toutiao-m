<template>
  <div class="search-history scroll-y-container">
    <van-cell>
      <template #title>
        <span class="history-header-title">历史记录</span>
      </template>
      <template #value>
        <span class="history-header-text">全部删除</span>
        <span class="history-header-text">完成</span>
        <van-icon name="delete"/>
      </template>
    </van-cell>
    <van-cell class="history-text">历史记录1</van-cell>
    <van-cell class="history-text">历史记录2</van-cell>
    <van-cell class="history-text">历史记录3</van-cell>
    <van-cell class="history-text">历史记录4</van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
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
.search-history {
  display: flex;
  flex-direction: column;
}
</style>
