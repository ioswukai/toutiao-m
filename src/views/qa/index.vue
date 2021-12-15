<template>
  <div class="container">
    问答
  </div>
</template>

<script>
export default {
  name: 'QAIndex',
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
    this.$store.commit('addCachePage', 'QAIndex')
  },
  methods: {}
}
</script>

<style scoped lang="less">
.container {
}
</style>
