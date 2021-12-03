<template>
  <div className="update-gender">
    <!--
    :default-index 默认选种的index
    @cancel="$emit('cancel')" 点击取消
    @confirm"onFinish" 点击确认
    @change="onPickerChange" 选择的值发生了改变
    -->
    <van-picker
      title="标题"
      :columns="columns"
      :default-index="userGender"
      @cancel="$emit('cancel')"
      @confirm="onFinish"
      @change="onPickerChange"
    />
  </div>
</template>

<script>

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    userGender: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      gender: this.userGender, // 用户选择的 性别
      columns: ['男', '女']
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
    onPickerChange (value, index) {
      this.gender = index
    },

    onFinish () {
      if (this.gender === this.userGender) {
        this.$toast('选择的性别和以前一样')
        return
      }

      // 更新用户性别
      this.$emit('confirm', { gender: this.gender })
    }
  }
}
</script>

<style scoped lang="less">

</style>
