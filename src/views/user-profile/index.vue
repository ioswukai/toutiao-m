<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
      title="头像"
      is-link
    >
      <template #value>
        <van-image
          class="user-photo"
          :src="user.photo"
          fit="cover"
        />
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender ? '女' : '男'"
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
    />

    <!--更新用户姓名-->
    <van-popup
      v-model:show="isUpdateNameShow"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        :user-name="user.name"
        @cancel="onClosePop"
        @confirm="updateUserInfo"
      />
    </van-popup>

    <!--更新用户性别-->
    <van-popup
      v-model:show="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        :user-gender="user.gender"
        @cancel="onClosePop"
        @confirm="updateUserInfo"
      />
    </van-popup>

    <!--更新用户生日-->
    <van-popup
      v-model:show="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        :user-birthday="user.birthday"
        @cancel="onClosePop"
        @confirm="updateUserInfo"
      />
    </van-popup>
  </div>
</template>

<script>
// import {
//   getProfile,
//   updateUserPhoto,
//   updateUserProfile } from '@/api/user'
import { getProfile, updateUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'

export default {
  name: 'UserProfile',
  components: { UpdateBirthday, UpdateGender, UpdateName },
  props: {},
  data () {
    return {
      user: {}, // 用来存储用户信息
      isUpdateNameShow: false, // 控制修改用户姓名
      isUpdateGenderShow: false, // 控制修改用户性别
      isUpdateBirthdayShow: false // 控制修改用户性别
    }
  },
  emits: {},
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getProfile()
        this.user = data.data
      } catch (err) {}
    },

    async updateUserInfo (data) {
      this.$toast.loading({
        message: '更新中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续时间，默认是2000毫秒即2秒，
        // 如果是0，则持续展示
        duration: 0
      })

      try {
        await updateUserProfile(data)
        this.$toast.success('更新成功')
        // 关闭弹框
        this.onClosePop()
        // 刷新数据
        this.loadUserProfile()
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },

    onClosePop () {
      this.isUpdateNameShow = false
      this.isUpdateGenderShow = false
      this.isUpdateBirthdayShow = false
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
}
.user-photo {
  height: 60px;
  width: 60px;
  border-radius: 30px;
}
</style>
