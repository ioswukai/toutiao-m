<template>
  <div class="article-list">
    <!--下拉刷新-->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <!--文章列表-->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
      <!--文章列表-->
    </van-pull-refresh>
    <!--下拉刷新-->

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pre_timestamp: null, // 请求下一页的时间戳
      list: [], // 存储列表的数据
      loading: true, // 控制 加载中 loading状态的显隐
      finished: false, // 控制数据 加载结束（没有更多了 ）状态的显隐
      error: false, // 控制列表 加载失败 的提示状态的显隐
      isRefreshLoading: false, // 控制 下拉刷新的loading 状态的显隐
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本，先写个默认值，防止什么都没写
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 初始化或滚动到底部的时候，会触发 onLoad事件
    // 初次请求数据没有铺满整屏幕，则会触发多次
    // 触发onLoad时，组件会自动把loading设置为true
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // 请求数据的页码
          // 第一页是当前时间戳 Date.now()
          // 后面页数，又接口返回 接口有点坑，初始也的数据不是Date.now(),
          // 写死成 即可1556789000001
          // timestamp: this.pre_timestamp || Date.now(),
          timestamp: this.pre_timestamp || '1556789000001',
          with_top: '1' // 是否包含置顶文章
        })

        // 测试代码 模拟随机失败的情况，以显示错误提示状态
        // if (Math.random() > 0.5) {
        //   JSON.parse('adagadg')
        // }

        // 2. 把请求结果放入list数组中
        const { results } = data.data
        // ...数组，数组的展开操作符，它会把数组元素一个一个的拿出来，传递给使用的位置
        this.list.push(...results)

        // 3. 本次数据加载结束之后，要把加载状态loading置为结束
        // loading 关闭以后，才能触发下一次加载更多
        this.loading = false

        // 4. 判断数据是否全部加载完成，
        // 如果没有数据了，把finished设置为true，之后
        // 不再触发加载更多
        // 判断还有下一页数据，则更新获取下一个数据的时间戳
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.pre_timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (e) {
        // 显示错误提示状态
        this.error = true
        // 请求失败了，loading也需要关闭
        this.loading = false
      }
    },

    // 当下拉刷新的时候，会触发该函数
    // 触发时，isRefreshLoading会自动设置为true
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // 请求数据的页码
          // 第一页是当前时间戳 Date.now()
          // 后面页数，又接口返回 接口有点坑，初始也的数据不是Date.now(),
          // 写死成 即可1556789000001
          // timestamp: this.pre_timestamp || Date.now(),
          timestamp: '1556789000001', // 每次获取最新数据，所以传递最新时间戳
          with_top: '1' // 是否包含置顶文章
        })

        // 测试代码 模拟随机失败的情况，以显示错误提示状态
        // if (Math.random() > 0.2) {
        //   JSON.parse('adagadg')
        // }

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false

        // 4.更新下拉刷新成功提示的文本 success-duration控制显示时长 默认是500毫秒
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (e) {
        // 请求失败 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        // 刷新失败的提示文本
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 受父元素的影响，如果父元素没有设置height，
  // 则子元素，高度为0
  // height: 100%;
  // css3中新增 视口单位`vw`和`vh`,
  // 就是浏览器窗口大小的单位，它不受父元素的影响
  // 1vw/1vh=可视窗口宽度/高度的1%，比如窗口宽750/高667，
  // 则1vw=7.5px/1vh=6.67px；
  height: 79vh;
  overflow-y: auto;
}
</style>
