<template>
  <div class="loading-page">
    <div class="loading-wrap">
      <van-loading
        class="loading"
        color="#3296fa"
        vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',
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
.loading-page {
  padding: 200px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
