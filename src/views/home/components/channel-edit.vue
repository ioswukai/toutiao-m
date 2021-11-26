<template>
  <div class="channel-edit">
    <!--我的频道 :border="false"绑定为false 不显示底边线 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <template #value>
        <!--
        type="danger" 类似红色效果
        plain 普通的按钮，无填充色
        round 圆角
        size="mini" 大小最小
        -->
        <van-button
          plain
          round
          class="eidt-btn"
          @click="isEdit = !isEdit"
        >{{isEdit ? '保存' : '编辑'}}</van-button>
      </template>
    </van-cell>
    <!--
        :gutter="10" // 格子之间的间距，默认单位为px
        -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in channels"
        :key="index"
        @click="onChannelActiveOrDelete(channel, index)"
      >
        <template #text>
          <!--动态绑定 active的样式class-->
          <span
            class="van-grid-item__text"
            :class="{active: index === active}"
          >{{ channel.name }}</span>
        </template>
        <template #icon v-if="isEdit && !this.fixedChannels.includes(channel.id)">
          <van-icon
            class="clear-icon"
            name="clear"/>
        </template>
      </van-grid-item>
    </van-grid>

    <!--频道推荐 :border="false"绑定为false 不显示底边线-->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <!--
            :gutter="10" // 格子之间的间距，默认单位为px
            -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        @click="onChannelAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
const MY_CHANNELS_KEY = 'TOUTIAO_MY_CHANNELS'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channels: { // 我的推荐列表 不可更改
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: [], // 所有的频道列表
      fixedChannels: [0] // 固定频道列表，里面存的是频道的id 如0：推荐
    }
  },
  emits: {
    /**
     * 供v-model使用
     */
    'update:active': null,
    'update:channels': null,
    close: null
  },
  computed: {
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find 变量数组，找到满足条件的元素项
    //     const ret = this.channels.find(mychannel => {
    //       return mychannel.id === channel.id
    //     })
    //     // 如果我的频道中不包含该频道，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
    recommendChannels () {
      // 这是数组的filter方法，他会遍历数组，把符合条件的元存储在新数组中
      return this.allChannels.filter(channel => {
        // 数组的find方法，也是遍历数组，把符合条件的第一个元素返回，
        return !this.channels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    },

    // 映射容器中的数据到组件
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 请求所有频道
    this.loadAllChannels()
  },
  mounted () {
  },
  methods: {

    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    async onChannelAdd (channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await addUserChannel({
            channels: [{
              id: channel.id,
              seq: this.channels.length
            }]
          })

          // 更新视图 直接往channels添加即可，计算属性自动处理推荐列表
          const myChannels = this.channels
          myChannels.push(channel)
          this.$emit('update:channels', myChannels)
        } else {
          // 更新视图 直接往channels添加即可，计算属性自动处理推荐列表
          const myChannels = this.channels
          myChannels.push(channel)
          this.$emit('update:channels', myChannels)

          // 未登录，将数据存储到本地
          await this.$nextTick(() => {
            setItem(MY_CHANNELS_KEY, this.channels)
          })
        }
      } catch (e) {
        this.$toast('添加频道失败')
      }
    },

    onChannelActiveOrDelete (channel, index) {
      if (this.isEdit) {
        // 删除
        this.onChannelDelete(channel, index)
      } else {
        // 关闭弹框
        this.$emit('close')

        // 更新 选中
        this.$emit('update:active', index)
      }
    },

    async onChannelDelete (channel, index) {
      try {
        if (this.fixedChannels.includes(channel.id)) {
          // 固定列表 不让删除
          return
        }

        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channel.id)

          // 如果删除的是前面的元素，激活索引需要减1
          if (index <= this.active) {
            // 更新 选中
            this.$emit('update:active', this.active - 1)
          }
          // 更新视图 直接给channels删除即可，计算属性自动处理推荐列表
          const myChannels = this.channels
          myChannels.splice(index, 1)
          this.$emit('update:channels', myChannels)
        } else {
          // 如果删除的是前面的元素，激活索引需要减1
          if (index <= this.active) {
            // 更新 选中
            this.$emit('update:active', this.active - 1)
          }
          // 更新视图 直接给channels删除即可，计算属性自动处理推荐列表
          const myChannels = this.channels
          myChannels.splice(index, 1)
          this.$emit('update:channels', myChannels)

          // 未登录，将数据存储到本地
          await this.$nextTick(() => {
            setItem(MY_CHANNELS_KEY, this.channels)
          })
        }
      } catch (e) {
        this.$toast('删除频道失败，请稍后重试')
      }
    }

  }
}
</script>

<style scoped lang="less">

// 公用样式
.channel-edit {
  // 让内容不被关闭按钮遮挡
  padding: 85px 0;
}

.title-text {
  font-size: 32px;
  color: #333;
}

.grid-item {
  width: 160px;
  height: 86px;
  font-size: 28px;
}

:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
  white-space: nowrap;
}

:deep(.van-grid-item__text) {
  font-size: 28px;
  color: #222;
  // 让中心对齐，因为文本有8px的外上边距
  margin-top: 0;
}

// 我的频道
.eidt-btn {
  font-size: 26px;
  height: 48px;
  width: 118px;
  color: #f85959;
  border: 1px solid #f85959;
}

.clear-icon {
  position: absolute;
  right: -97px;
  top: -36px;
  font-size: 30px;
  color: #cacaca;
  z-index: 2;
}

.active {
  color: #f85959;
}

// 频道推荐
.recommend-grid .grid-item :deep(.van-grid-item__content) {
  flex-direction: row;
}

:deep(.van-icon-plus)  {
  font-size: 28px;
  margin-right: 6px;
}

</style>
