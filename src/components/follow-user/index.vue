<template>
  <!--
  :class 绑定动态样式
  @click.stop 阻止单击事件继续冒泡
  -->
  <van-button
    :class="[followState ? 'followed-user' : 'unfollowed-user']"
    :loading="loading"
    @click.stop="onFollow"
  >
    <template #default>
      {{followState ? '已关注' : '关注' }}
    </template>
    <template #icon v-if="!followState">
      <van-icon name="plus"/>
    </template>
  </van-button>
</template>

<script>
import Network from '@/globalConfig/network'
import { followUser, unFollowUser } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  props: {
    // 是否关注
    isFollowed: {
      type: Boolean,
      default: false
    },
    userId: Network.routeParamsProp
  },
  data () {
    return {
      followState: false, // 父类的isFollowed不可更改，为了方便引入自身属性
      loading: false // 控制按钮是否可以点击
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
    this.followState = this.isFollowed
  },
  mounted () {
  },
  methods: {
    async onFollow () {
      // 显示加载
      this.loading = true

      // 发起请求
      const target = this.userId
      try {
        // 外面包裹一层try 防止js报错，后面取消loading的代码无法执行
        if (this.followState) {
          // 已关注，执行取消关注操作
          await unFollowUser(target)
        } else {
          // 未关注，执行关注操作
          await followUser({ target })
        }
        // 更新UI
        this.followState = !this.followState
        this.$toast.success(this.followState ? '关注成功' : '取消关注成功')
      } catch (err) {
        if (err.response && err.response.status === 410) {
          this.$toast('你不能关注你自己')
        }
      }

      // 取消加载显示
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
// 已关注
.followed-user {
  background-color: white;
  color: #333;
}
// 未关注
.unfollowed-user {
  background-color: #3196fa;
  color: white;
}
</style>
