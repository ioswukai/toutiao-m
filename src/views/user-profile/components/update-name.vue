<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('cancel')"
      @click-right="onFinish"
    />
    <div class="input-wrap">
      <!--v-model.trim 首尾空格不要-->
      <van-field
        v-model.trim="inputName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        show-word-limit
        placeholder="请输入昵称"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'UpdateName',
  components: {},
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      inputName: this.userName
    }
  },
  emits: {
    cancel: null,
    confirm: null
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onFinish () {
      if (this.inputName.length <= 0) {
        this.$toast('请先输入昵称')
        return
      }

      if (this.inputName === this.userName) {
        this.$toast('昵称与之前设置的一样')
        return
      }

      // 更新用户昵称
      this.$emit('confirm', { name: this.inputName })
    }
  }
}
</script>

<style scoped lang="less">
.input-wrap {
  background-color: #f5f7f9;
  padding: 20px;
}
:deep(.van-field__control) {
  color: #333;
}

</style>
