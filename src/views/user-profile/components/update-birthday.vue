<template>
  <div className="update-birthday">
    <!--
    type="date" 年月日
    v-model 当前显示的日期, 以及后续改变的日期
    min-date 可选的最小日期 ，月份索引从0-11
    max-date 可选的最大日期
    @cancel="$emit('cancel')" 点击取消
    @confirm"onFinish" 点击确认
    -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('cancel')"
      @confirm="onFinish"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    userBirthday: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.userBirthday)
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
      // 更新用户生日
      this.$emit('confirm', { birthday: dayjs(this.currentDate).format('YYYY-MM-DD') })
    }
  }
}
</script>

<style scoped lang="less">

</style>
