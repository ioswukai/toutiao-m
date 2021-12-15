<template>
  <div class="container">
    视频
  </div>
</template>

<script>
export default {
  name: 'VideoIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    // 在重新登录后，再次添加缓存
    this.$store.commit('addCachePage', 'VideoIndex')
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.container {
}
</style>
