<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <common-page-list
      ref="message-list"
      v-model="messages"
      :finished="finished"
      finishedText=""
      :load-data-request="onLoad"
      @reset-current-page="currentPage=1"
      @increase-current-page="currentPage++"
      class="chat-content">
      <van-cell
        v-for="(message, index) in messages"
        :key="index"
        :title="message.msg"/>
    </common-page-list>

    <van-field
      v-model.trim="message"
      class="input-field"
      placeholder="请输入消息"
    >
      <template #button>
        <van-button
          class="send-btn"
          type="success"
          @click="onSend"
        >发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import CommonPageList from '@/components/common-page-list'
// 加载导入socket.io-client 客户端
import { io } from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'UserChatIndex',
  components: { CommonPageList },
  props: {},
  data () {
    return {
      message: '', // 发送的消息
      messages: getItem('chat-messages') || [], // 消息列表
      networkData: null, // 网络请求返回的结果
      currentPage: 1, // 当前请求页吗
      socket: null, // webSocket 通讯对象
      finished: false // 控制数据 加载结束（没有更多了 ）状态的显隐
    }
  },
  emits: {},
  computed: {},
  watch: {

    messages: {
      handler (val, oldVal) {
        setItem('chat-messages', val)

        // 因为数据改变，影响视图更新这件事不是立即的，所以使用$nextTick
        // 如果你要把操作数据之后，立即操作数据影响的视图DOM，那么最好把
        // 代码放在$nextTick() 函数中
        // this.$nextTick(() => {
        // 滚动到最底部
        this.$refs['message-list'].scrollToBottom()
        // })
      },
      deep: true
    }
  },
  created () {
    // 建立连接
    // const socket = io('http://ttapi.research.itcast.cn')
    // 解决服务器跨域问题
    const socket = io()

    // data属性记录下 此实例
    this.socket = socket

    // 建立连接的回调 client-side
    socket.on('connect', () => {
      console.log('连接建立成功了，socket.id = ', socket.id)
    })
    socket.on('disconnect', () => {
      console.log('断开连接了，socket.id = ', socket.id)
    })

    // 监听message事件（事件名由接口定），接收服务端消息
    socket.on('message', function (data) {
      // console.log(data)
      // 把对方发给我的消息，也存储到数组中
      this.messages.push(data)
    })

    // 发消息
    // socket.emit('消息类型(后台接口规定的key字段名)'，消息内容(后台接口规定的key对应的value值))
    // 接收消息
    // socket.on('消息类型(后台接口规定的key字段名)'，function (data) { data消息 })
  },
  mounted () {
    // 一进入页面，就要滚动到最底部
    this.$refs['message-list'].scrollToBottom()
  },
  unmounted () {
    // 手动断开IM连接
    // this.socket.disconnect()
    this.socket.close()
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      // 清空之前的
      this.messages.length = 0
      this.finished = true
      return this.messages
    },

    onSend () {
      // 请求发送消息
      if (!this.message) { return }
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      // this.socket.emit('message', data)

      // 把用户发出去的消息，存储到数组中
      this.messages.push(data)

      // 清空输入框
      this.message = ''
    }
  }
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
  //background-color: #f5f7f9;
}
.send-btn {
  height: 60px;
  width: 120px;
  border-radius: 6px;
}
</style>
