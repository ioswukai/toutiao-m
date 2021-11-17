<template>
  <div class="home-container">

    <!--导航栏-->
    <van-nav-bar class="page-nav-bar">
      <template #left>
        <div class="logo"></div>
      </template>

      <template #right>
      <van-button
          class="search-btn"
          round
          size="small"
          icon="search"
        >搜索</van-button>
      </template>
    </van-nav-bar>
    <!--导航栏-->

    <!--频道列表 tab标签页-->
    <!--
    通过 v-model:active 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
    通过 animated 属性可以开启切换标签内容时的转场动画。
    通过 swipeable 属性可以开启滑动切换标签页。且可滑动拖拽切换的区域只在其内容的区域
    -->
    <van-tabs
      class="channel-tabs"
      v-model:active="active"
      animated
      swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!--文章列表-->
        <ArticleList :channel="channel" />
        <!--文章列表-->
      </van-tab>

      <!-- 汉堡按钮 -->
      <template #nav-right>
        <!--
        为了让所有的item显示处理，没有被汉堡按钮遮挡的部分
        添加站位div
        -->
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"/>
        </div>
      </template>
      <!-- 汉堡按钮 -->
    </van-tabs>
    <!--频道列表 tab标签页-->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {
  },
  data () {
    return {
      // 当前显示的tab索引
      active: 0,
      channels: [] // 频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {
  },
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (e) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  // 让tabbar不遮挡 home的内容
  padding-bottom: 100px;

  .page-nav-bar {
    background-color: #3196fa;
    .logo {
      background: url("~@/assets/logo.png") no-repeat;
      background-size: cover;
      width: 200px;
      height: 60px;
    }
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    /deep/ .search-btn {
      width: 330px;
      height: 64px;
      background-color: #5babfb;
      // 去掉边框
      border: none;
      // 内容文字的大小
      font-size: 28px;
      .van-icon {
        // 设置搜索图标的大小
        font-size: 32px;
        // 按钮往下移动一点
        margin-top: 2px;
      }
      .van-button__content {
        color: white;
      }
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      // 设置tab的父组件高
      height: 82px;
    }
    .van-tab {
      // tab标签 自带底边框，无需设置底边框
      border-right: 1px solid #edeff5;
      // 宽度不能写死成 200 ，但一个标签时，应该充满屏幕
      //width: 200px;
      // 设置最小宽度
      min-width: 200px;
      // 这个高度不包括底边指示条，
      // 所以不能设置它，需设置其父组件
      //height: 82px;
      // 设置文本
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      // 这样设置，底边指示条，会消失
      // 因为父元素，有个底边的padding
      bottom: 8px
    }
    .van-tabs__nav {
      // 去掉父元素的底padding
      padding-bottom: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      // 透明度
      opacity: 0.902;
      .toutiao-gengduo {
        font-size: 33px;
      }
      // 在当前元素的父元素，之前插入伪元素背景图内容
      &:before {
        content: "";
        width: 2px;
        height: 100%;
        background-image: url("~@/assets/banner.png");
        // 设置背景图的大小
        background-size: contain;
        // 让背景图，居左显示
        position: absolute;
        left: 0;
      }
    }
    .placeholder {
      width: 66px;
      height: 82px;
      // 兄弟节点的flex-basis已将父类空间分完
      // flex-shrink: 0 让placeholder不参与父类空间的计算
      flex-shrink: 0;
    }
  }
}
</style>
