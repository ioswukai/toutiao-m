<template>
  <div class="my-container">

    <!-- 已登录header -->
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <!--fit 设置图片的填充-->
          <van-image
            class="avater"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            round
            fit="cover"
          />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录header -->

    <!-- 未登录header -->
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 未登录header -->

    <!--
    宫格导航
    :column-num 绑定属性为2
    clickable 开启点击反馈
    -->
    <van-grid class="grid-nav"
      :column-num="2"
      clickable
    >
      <van-grid-item class="grid-item" >
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item" >
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!--宫格导航-->

    <!-- 小智 -->
    <van-cell-group class="cell-wrap" :border="false">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 小智 -->

    <!-- 退出登录 -->
    <van-cell-group class="cell-wrap logout-btn-wrap" :border="false" >
      <van-cell
        class="logout-btn"
        title="退出登录"
        clickable
      />
    </van-cell-group>
    <!-- 退出登录 -->
  </div>
</template>

<script>
// 映射容器中的数据到组件
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    // 映射容器中的数据到组件
    ...mapState(['user'])
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
.my-container {
  .header {
    height: 361px;
    // 加载图片
    background: url("~@/assets/banner.png");
    // 设置图片填充 铺满
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      //background-color: pink;
      // 设置内边距 上、左、下
      padding: 76px 32px 23px;
      // 设置为border-box 则`内边距`和`边框`都将
      // 在已设定的宽度和高度 内进行绘制
      // 此时控件的总高度为 231
      // 如不设置 则`内边距`和`边框`将在宽度和高度 外进行绘制
      // 此时控件的总高度为 231 + 76 + 23
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avater {
          width: 100px;
          height: 100px;
          // 设置四条边框：线宽4 solid实线 白色
          border: 4px solid white;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #ffffff;
        }
      }
    }
    .data-stats {
      // flex布局，最好由子组件撑起高度
      //height: 130px;
      //background-color: #cccccc;
      display: flex;
      .data-item {
        height: 130px;
        // 等效于flex-grow：1 子组件均分空间
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      // 根据标签名i  和class类名toutiao 设置样式
      i.toutiao {
        font-size: 45px;
      }
      // 根据class实例 设置样式
      .toutiao-shoucang {
        color: #eb5253
      }
      .toutiao-lishi {
        color: #ff9d1d
      }
      span.text {
        font-size: 28px;
        margin-top: 6px;
      }
    }
  }

  .logout-btn-wrap {
    .logout-btn {
      text-align: center;
    }
  }

  .cell-wrap {
    margin-top: 20px;
  }
}
</style>
