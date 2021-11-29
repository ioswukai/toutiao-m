<template>
  <div class="search-history scroll-y-container">
    <van-cell>
      <template #title>
        <span class="history-header-title">历史记录</span>
      </template>
      <template #value>
        <div class="history-header-text-wrap" v-if="isEdit">
          <span
            class="history-header-text"
            @click="deleteAll"
          >全部删除</span>
          <span
            class="history-header-text"
            @click="isEdit = false"
          >完成</span>
        </div>
        <van-icon
          name="delete"
          v-else
          @click="isEdit = true"
        />
      </template>
    </van-cell>
    <van-cell
      v-for="(text, idx) in searchHistorys"
      :key="idx"
      :title="text"
      @click="$emit('search', text)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isEdit: false // 编辑历史记录
    }
  },
  emits: {
    search: null // 通知父组件，搜索 所点击的历史记录
  },
  computed: {
    ...mapState(['searchHistorys'])
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    deleteAll () {
      this.searchHistorys.length = 0
      // 存储历史记录
      this.$store.commit('searchHistorys', this.searchHistorys)
    }
  }
}
</script>

<style scoped lang="less">
.search-history {
}

// header标题
.history-header-title {
  font-size: 30px;
}
.history-header-text {
  margin-left: 20px;
}
:deep(.van-cell__value) {
  display: flex;
  flex: unset;
  align-items: center;
}
:deep(.van-icon-delete) {
  font-size: 40px;
  color: #3296fa;
}

</style>
