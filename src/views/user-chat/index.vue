<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="chat-content">
    </div>

    <van-field
      v-model="message"
      class="input-field"
    >
      <template #button>
        <van-button
          class="send-btn"
          type="success">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: 'UserChatIndex',
  components: {},
  props: {},
  data () {
    return {
      message: '' // 发送的消息
    }
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
.user-chat {
}

// 聊天内容
.chat-content {
  position: fixed;
  top: 92px;
  bottom: 104px;
  width: 100%;
}
// 输入条
.input-field {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #f5f7f9;
}
.send-btn {
  height: 60px;
  width: 120px;
  border-radius: 6px;
}
</style>
