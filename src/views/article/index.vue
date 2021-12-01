<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="main-wrap">
      <!-- 加载中 -->
      <loading-page v-if="loading" />
      <!-- 加载中 -->

      <!-- 加载完成-文章详情 存在article.title 加载成功-->
      <div v-else-if="article.title" class="article-detail">

        <!-- 用户信息 -->
        <div class="header">
          <div class="title">{{article.title}}</div>
          <div class="user-wrap">
            <div class="user-left">
              <van-image
                class="user-image"
                round
                fit="cover"
                :src="article.aut_photo"
              />
              <div class="user-detail">
                <span class="user-name">{{article.aut_name}}</span>
                <span class="user-date">{{$filters.relativeTime(article.pubdate)}}</span>
              </div>
            </div>
            <van-button
              class="follow-btn"
              icon="plus"
              round
            >关注</van-button>
          </div>
        </div>
        <!-- 用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <!-- 文章内容 -->
        <van-divider>正文结束</van-divider>
      </div>
      <!-- 加载完成-文章详情 -->

      <!-- 加载失败 -->
      <error-page
        v-else
        :error="error"
        @retry-btn-click="loadArticle"
      />
      <!-- 加载失败 -->

    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        name="star-o"
      />
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

  </div>
</template>

<script>
import Network from '@/globalConfig/network.js'
import { getArticleById } from '@/api/article'
import LoadingPage from '@/components/loading-page'
import ErrorPage from '@/components/error-page'

export default {
  name: 'ArticleIndex',
  components: {
    LoadingPage,
    ErrorPage
  },
  props: {
    articleId: Network.routeParamsProp
  },
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {}, // 文章详情
      error: {} // 控制加载失败的显示
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {
  },
  methods: {
    async loadArticle () {
      try {
        // 显示加载中
        this.loading = true
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (err) {
        // 显示失败页面
        this.error = err
      }
      // 取消加载中显示
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
@import url('./github-markdown.css');

// 主容器
.main-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 88px;
  overflow-y: scroll;
  background-color: #fff;
}

// header
.header {
  margin: 0 40px;
}
.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 32px 0;
}
.user-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
}
.user-left {
  display: flex;
  align-items: center;
}
.user-image {
  width: 75px;
  height: 75px;
}
.user-detail {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.user-name {
  font-size: 28px;
  color: #333;
}
.user-date {
  font-size: 24px;
  color: #999;
}
.follow-btn {
  background-color: #3196fa;
  color: white;
  width: 200px;
  height: 60px;
  font-size: 24px;
}

// 正文
// 文本内容
.article-content {
  padding: 40px 32px;
  :deep(p) {
    // 段落文本，两端对齐
    text-align: justify;
  }
}

// 底部区域
.article-bottom {
  // 固定在底部
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  // flexbox
  display: flex;
  // 伸缩项目会平均分布在主轴线（水平）里，两端保留一半的空间
  justify-content: space-around;
  // 垂直居中
  align-items: center;
  // top边线的高度，应该总高度内
  box-sizing: border-box;
  border-top: 1px solid #d8d8d8;
  .comment-btn {
    width: 282px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    color: #333;
  }
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 22px;
      background-color: #e22829;
    }
  }
}
</style>
