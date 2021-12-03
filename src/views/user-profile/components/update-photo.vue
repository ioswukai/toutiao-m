<template>
  <div class="update-photo">
    <!--图片预览-->
    <image-cropper
      ref="cropper"
      :src="src"
    />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('cancel')"
      @click-right="onFinish"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/image-cropper'

export default {
  name: 'UpdatePhoto',
  components: {
    ImageCropper
  },
  props: {
    // 可能是blob对象，也可能是blob的urlStr
    src: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  emits: {
    cancel: null,
    confirm: null
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onFinish () {
      // 更新用户头像
      const formData = new FormData()
      // 异步操作 用await 同步获取数据
      const file = await this.$refs.cropper.getCroppedBlob()
      formData.append('photo', file)
      this.$emit('confirm', formData)
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}
</style>
