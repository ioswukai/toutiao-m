<template>

  <div class="article-auth">
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

</template>

<script>
export default {
  name: 'ArticleAuth',
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
  emits: {},
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
// header
.article-auth {
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
</style>
