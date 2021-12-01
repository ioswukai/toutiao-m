<template>

  <div class="article-auth">
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

    <!--关注按钮-->
    <follow-user
      v-if="!user || article.aut_id !== user.user_id"
      class="follow-user"
      :isFollowed="article.is_followed"
      :userId="article.aut_id"
    />
  </div>

</template>

<script>
import FollowUser from '@/components/follow-user'
import { mapState } from 'vuex'

export default {
  name: 'ArticleAuth',
  components: {
    FollowUser
  },
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
  computed: {
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
// 主视图
.article-auth {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 40px;
}
// 左侧
.user-left {
  display: flex;
  align-items: center;
}
.user-image {
  width: 75px;
  height: 75px;
}
// 姓名和时间
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
// 关注按钮
.follow-user {
  width: 200px;
  height: 60px;
  font-size: 24px;
  // 设置圆角
  border-radius: 30px
}
</style>
