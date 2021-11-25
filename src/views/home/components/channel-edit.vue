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
        >编辑</van-button>
      </template>
    </van-cell>
    <!--
        :gutter="10" // 格子之间的间距，默认单位为px
        -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear"
        @click="onChannelActiveOrDelete(channel, index)"
      >
        <template #text>
          <!--动态绑定 active的样式class-->
          <span
            class="van-grid-item__text"
            :class="{active: index === modelValue}"
          >{{ channel.name }}</span>
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
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  emits: {
    /**
     * 供v-model使用
     */
    'onUpdate:modelValue': null,
    close: null
  },
  data () {
    return {
      isEdit: false,
      allChannels: [] // 所有的频道
    }
  },
  computed: {
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find 变量数组，找到满足条件的元素项
    //     const ret = this.myChannels.find(mychannel => {
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
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {
  },
  methods: {
    onChannelActiveOrDelete (channel, index) {
      console.log('onChannelActiveOrDelete')
      if (this.isEdit) {
      } else {
        this.$emit('onUpdate:modelValue', index)
      }
    },

    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
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

:deep(.van-icon-clear)  {
  position: absolute;
  right: -10px;
  top: -10px;
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
