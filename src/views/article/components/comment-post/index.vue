<template>
  <div class="comment-post">
    <!--
    rows="2" 分两部分显示，上面是输入的内容，下面显示字数统计
    type="textarea" 输入视图
    autosize 对于输入视图 设置其高度自适应
    maxlength 最多输入的字符数
    show-word-limit 在底部显示字数统计
    v-model.trim="message" 对message赋值时，自动去掉首尾的制表符 如空格
    -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      show-word-limit
      placeholder="优质评论将会被优先展示"
    />
    <!--:disabled 控制按钮是否可点击, 有输入才可点击-->
    <van-button
      class="post-btn"
      @click="onPostComment"
      :disabled="message.length <= 0"
    >发布</van-button>

  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import Network from '@/globalConfig/network'

export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: Network.routeParamsProp // 评论的目标id, 目标文章id或者目标评论id
  },
  data () {
    return {
      message: '' // 评论的内容
    }
  },
  emits: {
    'post-success': null
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onPostComment () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id, 目标文章id或者目标评论id
          content: this.message, // 评论内容
          art_id: null // 文章id，如果对评论回复需要传，对文章评论不用传
        })
        // 清空文本框
        this.message = ''
        // 让父组件 关闭弹出层 并将发布的内容显示到列表顶部
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: stretch;
  padding: 24px;
}
.van-cell {
  background-color: #f5f7f9;
  border-radius: 12px;
}
.post-btn {
  height: unset;
  flex-basis: 130px;
  border: unset;
  font-size: 30px;
  color: #3196fa;
  white-space:nowrap;
}
</style>
