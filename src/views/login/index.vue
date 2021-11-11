<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
    >
      <template #left>
        <van-icon
          name="cross"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!--  登录表单  -->
    <!--  表单验证
          1. 给van-field配置rules 验证规则
          2. 当表单提交的时候，会自动触发表单验证
             如果验证通过，会触发 submit 事件
             如果验证失败，不会触发 submit事件-->
    <van-form ref="loginForm" @submit="onSubmit">
      <!--CellGroup 为cell提供上下边框 -->
      <van-cell-group>
      <!--   监听:rules ，获取校验规则数组    -->
      <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          :rules="userFormRules.mobile"
        >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"/>
        </template>
      </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证吗"
          type="number"
          maxlength="6"
          :rules="userFormRules.code"
        >
          <template #left-icon>
            <i class="toutiao toutiao-yanzhengma"/>
          </template>
          <template #button>
            <!--倒计时 time时间单位是毫秒 format格式 finish倒计时结束监听-->
            <van-count-down
              @finish="isCountDownShow = false"
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
            />
            <!-- native-type="button" 防止click触发表单校验 -->
            <van-button
              v-else
              class="send-sms-btn"
              native-type="button"
              round
              size="small"
              type="default"
              @click="onSendSms"
            >发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!--  登录表单  -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
        // mobile: '',
        // code: ''
      },
      userFormRules: {
        mobile: [{
          // 必填项
          required: true,
          message: '手机号不能为空'
        }, {
          // 通过正则表达式验证
          pattern: /1[3|5|7|8]\d{9}/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          // 通过正则表达式验证
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onSubmit () {
      // 1. 获取表达数据
      const user = this.user
      // 2. 表单验证 通过rules组件自行校验
      // 3. 提交表单，请求登录
      this.$toast.loading({
        message: '登录中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续时间，默认是2000毫秒即2秒，
        // 如果是0，则持续展示
        duration: 0
      })
      try {
        // 结构服务器返回的值
        const { data } = await login(user)
        // 向Vuex提交user的修改
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('手机号或验证码错误')
        }
      }
      // 4. 接收请求结果，后续处理
    },
    async onSendSms () {
      // 1. 校验手机号
      try {
        // validate支持传入名字，返回promise
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        // 不想将后续逻辑嵌套到 上面的try代码块中
        // 失败后return，代码块外接着执行后续逻辑
        return console.log('验证失败', err)
        // 直接返回return不容许
        // return
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('发送成功')
        console.log('发送成功', res)
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
        console.log('验证失败', err)
      }
      // 发送完成后，关闭倒计时
      this.isCountDownShow = false
    }
  }
}
</script>

<style scoped lang="less">
.container {
  // 根据class类名toutiao，设置样式
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    // 按钮文本垂直居中
    line-height: 46px;
    // 文本大小
    font-size: 22px;
    // 按钮文本背景色
    color: #666666;
    // 按钮背景色
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      // 按钮背景色
      background-color: #6db4fb;
      // 去掉边框
      border: none;
    }
  }
}
</style>
