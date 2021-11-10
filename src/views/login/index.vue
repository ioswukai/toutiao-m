<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
    >
      <template #left>
        <van-icon name="cross"/>
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!--  登录表单  -->
    <!--  表单验证
          1. 给van-field配置rules 验证规则
          2. 当表单提交的时候，会自动触发表单验证
             如果验证通过，会触发 submit 事件
             如果验证失败，不会触发 submit事件-->
    <van-form @submit="onSubmit">
      <!--CellGroup 为cell提供上下边框 -->
      <van-cell-group>
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
            <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
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
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
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
      }
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
      // 2. 表单验证
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
        const res = await login(user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('手机号或验证码错误')
        }
      }
      // 4. 接收请求结果，后续处理
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
