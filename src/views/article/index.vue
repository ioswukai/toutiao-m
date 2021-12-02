<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <!--内容区域-->
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

        <!-- 文章评论 -->
        <comment-list
          ref="comment-list"
          :source="article.art_id"
          @updateTotalCommentCount="totalCommentCount = $event"
          @click-reply="onReplyComment"
        />

        <!-- 底部区域 需要用到article，所以应该在article返回后渲染-->
        <article-footer
          :article="article"
          :badge="totalCommentCount"
          @write-comment="isPostShow = true"
        />

        <!-- 对文章发布评论
        position="bottom" 从底部弹出
        -->
        <van-popup
          v-model:show="isPostShow"
          position="bottom"
        >
          <comment-post
            v-if="isPostShow"
            :target="article.art_id"
            @post-success="onPostOrReplyCommentSuccess"
          />
        </van-popup>

        <!-- 对评论发布回复-->
        <van-popup
          v-model:show="isReplyShow"
          position="bottom"
        >
          <comment-reply
            class="comment-reply"
            v-if="isReplyShow"
            :comment="toReplyComment"
            :article-id="article.art_id"
            @reply-success="onPostOrReplyCommentSuccess"
          />
        </van-popup>
      </div>

      <!-- 加载失败 -->
      <error-page v-else
        :error="error"
        @retry-btn-click="loadArticle"
      />
    </div>

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
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply'

export default {
  name: 'ArticleIndex',
  components: {
    CommentReply,
    CommentPost,
    CommentList,
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
      error: {}, // 控制加载失败的显示
      totalCommentCount: 0, // 总评论数
      isPostShow: false, // 控制写评论弹框的显隐
      isReplyShow: false, // 控制回复评论弹框的显隐
      toReplyComment: {} // 待回复的评论
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
    // 加载详情
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
    },

    // 发布评论成功回调
    onPostOrReplyCommentSuccess () {
      // 关闭弹框
      this.isPostShow = false
      this.isReplyShow = false

      // 将发布内容显示到列表顶部 刷新评论
      this.$refs['comment-list'].onRefresh()
    },

    onReplyComment (comment) {
      // 记录comment对象，传给回复评论弹框
      this.toReplyComment = comment
      // 显示回复评论弹框
      this.isReplyShow = true
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

// 回复评论遮罩
.comment-reply {
  height: 90vh;
}
</style>
