<template>
  <van-cell class="article-item">
    <template #title>
      <!-- vant 内置样式类
        van-multi-ellipsis--l2 最多显示两行，多了省略...
      -->
      <div class="title van-multi-ellipsis--l2">{{article.title}}</div>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <!-- 为了方便控制的图片样式，给包裹一个容器-->
        <div
          class="cover-item"
          v-for="(img,index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-img"
            :src="img"
            fit="cover"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{ $filters.relativeTime(article.pubdate) }}</span>
      </div>
    </template>
    <!-- 条件渲染插槽，而非v-image -->
    <template #value v-if="article.cover.type === 1">
      <!--fit="cover"
      让图片的短边显示全，图片不会拉伸，
      只不过有些内容会看不见 -->
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

 // 取消value插槽 flex=1 的平分
  :deep(.van-cell__value) {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    // 水平布局
    display: flex;
    padding: 10px 0;
    .cover-item {
      // 每一项都平分空间
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
