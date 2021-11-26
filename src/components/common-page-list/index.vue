/**
 * 对van-list进行封装，使其使用更方便，
 *
 * !!! list需要有自己的滚动容器，所以需要父组件通过$attrs
 * 给common-page-list组件 传递
 * height样式，或能确定高度的其他样式组合
*/
<template>
  <div class="common-page-list">
    <!--下拉刷新-->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="800"
    >
      <!--列表-->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        ref="vanList"
      >
        <slot/>
      </van-list>
      <!--列表-->
    </van-pull-refresh>
    <!--下拉刷新-->
  </div>
</template>

<script>
export default {
  name: 'CommonPageList',
  components: {},
  props: {
    // /**
    //  * list需要有自己的滚动容器 需设置 height
    //  * 默认 50vh  由父组件，通过$attrs传递更灵活
    //  */
    // height: {
    //   type: String,
    //   default: '50vh'
    // },
    /**
     * 请求网络数据的方法
     */
    loadDataRequest: {
      type: Function,
      required: true
    },
    /**
     * 列表的数据源数组
     * 默认值 空数组，[]
     */
    modelValue: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: {
    /**
     * 通知父组件，将currentPage重置到初始
     */
    resetCurrentPage: null,
    /**
     * 通知父组件，递增CurrentPage的值
     * 发送通知的场景是：本次请求结束，且请求结果的长度大于0
     */
    increaseCurrentPage: null,
    /**
     * 供v-model使用
     */
    'onUpdate:modelValue': null
  },
  data () {
    return {
      loading: true, // 控制 加载中 loading状态的显隐
      finished: false, // 控制数据 加载结束（没有更多了 ）状态的显隐
      error: false, // 控制列表 加载失败 的提示状态的显隐
      isRefreshLoading: false, // 控制 下拉刷新的loading 状态的显隐
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本，先写个默认值，防止什么都没写
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 初始化或滚动到底部的时候，会触发 onLoad事件
    // 初次请求数据没有铺满整屏幕，则会触发多次
    // 触发onLoad时，组件会自动把loading设置为true
    // isRefreshAction，true为刷新操作，否则加载更多
    async onLoad (isRefreshAction) {
      try {
        // 1. 请求获取网络数据
        const results = await this.loadDataRequest()

        // 测试代码 模拟随机失败的情况，以显示错误提示状态
        // if (Math.random() > 0.5) {
        //   JSON.parse('adagadg')
        // }

        // 2. 判断数据
        if (results.length) {
          // 之前的数据源
          var list = this.modelValue

          if (isRefreshAction) {
            // 下拉刷新操作
            // 需要清空数组
            list.length = 0
            // 更新下拉刷新成功提示的文本 success-duration控制显示时长 默认是500毫秒
            this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`

            // 手动触发 当数据不满一屏时，连续调用onLoad()的校验
            // check挪到整个代码的最底下，让页面刷新完，再检查
            // this.$refs.vanList.check()
            setTimeout(this.$refs.vanList.check, 0)
          }
          // ...数组，数组的展开操作符，它会把数组元素一个一个的拿出来，传递给使用的位置
          list.push(...results)
          // 更新父组件的数据源
          this.$emit('onUpdate:modelValue', list)
          // 更新父组件的CurrentPage
          this.$emit('increaseCurrentPage')
        } else {
          // 3. 判断数据是否全部加载完成，
          // 如果没有数据了，把finished设置为true，之后
          // 不再触发加载更多
          this.finished = true
          // 下拉刷新完成的提示文本
          this.refreshSuccessText = '暂无数据'
        }
      } catch (e) {
        // 显示错误提示状态
        this.error = true
        // 下拉刷新完成的提示文本
        this.refreshSuccessText = '刷新失败'
      }

      // 4. 本次数据加载结束之后，要把加载状态loading置为结束
      // loading 关闭以后，才能触发下一次加载更多
      this.loading = false
      this.isRefreshLoading = false
    },

    // 当下拉刷新的时候，会触发该函数
    // 触发时，isRefreshLoading会自动设置为true
    async onRefresh () {
      // 通知父组件，将currentPage重置到初始
      this.$emit('resetCurrentPage')
      // 还是调用onLoad方法，传递isRefreshAction=true
      await this.onLoad(true)
    }
  }
}
</script>

<style scoped lang="less">
.common-page-list {
  /**
   * list需要有自己的滚动容器 通过设置 height 和 overflow-y实现
   *
   * height: 100%;受父元素的影响，如果父元素没有设置height，
   * 则子元素，高度为0
   *
   * css3中新增 视口单位`vw`和`vh`,
   * 就是浏览器窗口大小的单位，它不受父元素的影响
   * 1vw/1vh=可视窗口宽度/高度的1%，比如窗口宽750/高667，
   * 则1vw=7.5px/1vh=6.67px；
   */

  // 在css中，通过v-bind使用js变量  由父组件，通过$attrs传递更灵活
  //height: v-bind(height);
  overflow-y: auto;
}
</style>
