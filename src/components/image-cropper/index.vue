<template>
  <!--必须包裹在块级标签中，如div-->
  <div class="image-cropper">
    <img
      ref="image"
      :src="srcURLStr"
      class="pic" />
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'ImageCropper',
  components: {},
  props: {
    // 可能是blob对象，也可能是blob的urlStr
    src: {
      type: [String, Object],
      required: true
    },
    cropperOptions: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cropper: null // 裁切器实例
    }
  },
  emits: {},
  computed: {
    srcURLStr () {
      if (typeof this.src === 'object') {
        return window.URL.createObjectURL(this.src)
      }
      return this.src
    }
  },
  watch: {},
  created () {},
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      // 监听裁剪区域的参数改变
      crop (event) {
        // console.log(event.detail.x)
        // console.log(event.detail.y)
        // console.log(event.detail.width)
        // console.log(event.detail.height)
        // console.log(event.detail.rotate)
        // console.log(event.detail.scaleX)
        // console.log(event.detail.scaleY)
      },
      /** 查看模式
       * 0：裁剪框可扩展到画布（图片）的外部
       * 1 2 3 ：裁剪框不能扩展到外部
       */
      viewMode: 1,
      /** 拖动模式
       * corp，none：默认`corp`，裁剪框可以拖拽，但图片不可拖拽
       * move：裁剪框不可拖拽，图片可以拖拽，
       */
      dragMode: 'move',
      aspectRatio: 1, // 截图比例
      /** 自动截取区域
       * 1：裁剪框在截图比例下，自动撑满画布的大小
       */
      // autoCropArea: 1,
      cropBoxMovable: false, // 不允许截图区域移动
      cropBoxResizable: false, // 不允许截图区域缩放
      background: false, // 关闭马克饼似的背景
      movable: true // 默认是true 画布是否允许移动
      // modal: true // 显示阴影区域
      // ...this.cropperOptions
    })
  },
  methods: {
    getCroppedBlob () {
      return new Promise(resolve => {
        // 异步不操作，返回Promise，方便使用await
        this.cropper.getCroppedCanvas().toBlob(resolve)
      })
    }
  }
}
</script>

<style scoped lang="less">
// 必须设置如下样式
.pic {
  // img 也应为块级
  display: block;
  // 防止图片超过屏幕
  max-width: 100%;
}
</style>
