<template>
  <div class="error-page">

    <!-- /加载失败：404 -->
    <van-empty
      v-if="isShow404"
      description="该资源不存在或已删除！"
      image="network"
    />
    <!-- /加载失败：404 -->

    <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
    <van-empty
      v-else
      description="内容加载失败！"
    >
      <van-button
        round
        type="danger"
        class="retry-btn"
        @click="$emit('retryBtnClick')"
      >点击重试</van-button>
    </van-empty>
    <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->

  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  components: {},
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  emits: {
    retryBtnClick: null // 点击重试按钮回调
  },
  computed: {
    isShow404 () {
      return (this.error && this.error.response && this.error.response.status === 404)
    }
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="less">
.error-page {
  // 让错误视图，能够称满一屏
  padding: 200px 32px;
  // 让错误视图，居中显示
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
:deep(.van-empty__description) {
  font-size: 30px;
  color: #666666;
  margin: 33px 0 46px;
}
:deep(.van-empty__bottom) {
  margin-top: 0;
}
.retry-btn {
  width: 280px;
  height: 70px;
  line-height: 70px;
  font-size: 30px;
}
</style>
