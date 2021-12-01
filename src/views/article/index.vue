<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <!--中间区域-->
    <div class="main-wrap">
      <!-- 加载中 -->
      <loading-page v-if="loading" />

      <!-- 加载完成-文章详情 存在article.title 加载成功-->
      <div v-else-if="article.title" class="article-detail">

        <!-- 标题 -->
        <div class="title">{{article.title}}</div>

        <!-- 用户信息 -->
        <ArticleAuth :article="article"/>

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="articleContentRef"
        />

        <!-- 分割线 -->
        <van-divider>正文结束</van-divider>
      </div>

      <!-- 加载失败 -->
      <error-page v-else
        :error="error"
        @retry-btn-click="loadArticle"
      />
    </div>

    <!-- 底部区域 -->
    <article-footer :article="article"/>

  </div>
</template>

<script>
import Network from '@/globalConfig/network.js'
import { getArticleById } from '@/api/article'
import LoadingPage from '@/components/loading-page'
import ErrorPage from '@/components/error-page'
import imagePreviewByElement from '@/utils/imagePreviewByElement'
import ArticleAuth from '@/components/article-auth'
import ArticleFooter from './components/article-footer'

export default {
  name: 'ArticleIndex',
  components: {
    LoadingPage,
    ErrorPage,
    ArticleAuth,
    ArticleFooter
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
        // 添加图片预览 articleContentRef需要页面渲染完，才能拿到
        // 因此将其包裹在setTimeout内
        setTimeout(() => {
          imagePreviewByElement(this.$refs.articleContentRef)
        }, 0)
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

// 标题
.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 32px 40px;
}

// 正文
.article-content {
  padding: 16px 40px;
  :deep(p) {
    // 段落文本，两端对齐
    text-align: justify;
  }
}
</style>
