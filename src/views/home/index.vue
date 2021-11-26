<template>
  <div class="home-container">

    <!--导航栏 本身有个flex属性，实现固定定位-->
    <van-nav-bar class="page-nav-bar" fixed >
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
        <!--
            ArticleListNew 使用了 common-page-list，封装了van-list
            而ArticleList 直接使用 van-list
        -->
        <!-- ArticleList <ArticleList :channel="channel" />-->
        <ArticleListNew :channel="channel" />
        <!--文章列表-->
      </van-tab>

      <!-- 汉堡按钮 -->
      <template #nav-right>
        <!--
        为了让所有的item显示处理，没有被汉堡按钮遮挡的部分
        添加站位div
        -->
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"/>
        </div>
      </template>
      <!-- 汉堡按钮 -->
    </van-tabs>
    <!--频道列表 tab标签页-->

    <!-- 频道编辑 -->
    <!--
        position="bottom" 底部弹出
        closeable 显示关闭图标
        close-icon-position="top-left" 默认是top-right 我们需在左边
        :style="{ height: '100%' }" 弹屏的高度 全屏显示
     -->
    <van-popup
      v-model:show="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--v-if="isChannelEditShow"
      强制让channel-edit每次都更新
      默认：只有第一次更新
      -->
      <channel-edit
        @close="isChannelEditShow = false"
        v-model:active="active"
        v-model:channels="channels"
        v-if="isChannelEditShow"
      />
    </van-popup>
    <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
// import ArticleList from './components/article-list'
import ArticleListNew from './components/article-list-new'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
const MY_CHANNELS_KEY = 'TOUTIAO_MY_CHANNELS'

export default {
  name: 'HomeIndex',
  components: {
    // ArticleList
    ArticleListNew,
    ChannelEdit
  },
  props: {
  },
  data () {
    return {
      // 当前显示的tab索引
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 控制popup弹层
    }
  },
  computed: {
    // 映射容器中的数据到组件
    ...mapState(['user'])
  },
  watch: {
    /**
     * 后台返回数据的index 不准确，导致跳转有问题，
     * 用v-model实时绑定本地数据channels, 不请求网络
     * */
    // // 监听isChannelEditShow的关闭，刷新页面
    // // 可能对频道进行的编辑，首页需要实时更新
    // isChannelEditShow: {
    //   handler (val, oldVal) {
    //     if (val === false) {
    //       // 关闭事件，发起请求
    //       this.loadUserChannels()
    //     }
    //   }
    // }
  },
  created () {
    this.loadUserChannels()
  },
  mounted () {
  },
  methods: {
    async loadUserChannels () {
      try {
        let channels = []
        if (this.user) {
          // 已登录，从服务器获取数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录 从本地获取
          channels = getItem(MY_CHANNELS_KEY)
          console.log('从本地获取的数据是', channels)
          if (!channels) {
            // 本地没有，请求默认数据
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        // 将数据更新到组件中
        this.channels = channels
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
  // 让nav和tab页的tab栏 不遮挡 home的内容
  padding-top: 174px;

 .page-nav-bar {
    background-color: #3196fa;
    .logo {
      background: url("~@/assets/logo.png") no-repeat;
      background-size: cover;
      width: 200px;
      height: 60px;
    }
    :deep(.van-nav-bar__title) {
      max-width: unset;
    }
   :deep(.search-btn) {
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

  :deep(.channel-tabs) {
    .van-tabs__wrap {
      // 设置tab的父组件高
      height: 82px;
      // 设置tab为固定定位
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      border-bottom: 1px solid #edeff5;
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
