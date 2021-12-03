<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!--
    $refs.file.click()
    手动触发input标签的点击事件
    -->
    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
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

    <!--更新用户头像
     type="file"  可以选任何文件
     hidden 样式太丑了，所以隐藏
     accept="image/*"  规定只可选图片，image/png image/jpg等
     @change="onFileChange" 选完图片后的回调
    -->
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >
    <!--
    style="height: 100%" 内容显示100%高度
    -->
    <van-popup
      v-model:show="isCropShow"
      position="bottom"
      style="height: 100%"
    >
      <update-photo
        v-if="isCropShow"
        :src="cropImage"
        @cancel="onClosePop"
        @confirm="updateUserPhoto"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  getProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  name: 'UserProfile',
  components: { UpdatePhoto, UpdateBirthday, UpdateGender, UpdateName },
  props: {},
  data () {
    return {
      user: {}, // 用来存储用户信息
      isUpdateNameShow: false, // 控制修改用户姓名
      isUpdateGenderShow: false, // 控制修改用户性别
      isUpdateBirthdayShow: false, // 控制修改用户性别
      isCropShow: false, // 控制修改用户图片
      cropImage: null // 用户选择的图片
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

    async updateUserPhoto (formData) {
      this.$toast.loading({
        message: '更新中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续时间，默认是2000毫秒即2秒，
        // 如果是0，则持续展示
        duration: 0
      })

      try {
        await updateUserPhoto(formData)
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
      this.isCropShow = false
    },

    onFileChange () {
      // 得到图片文件对象
      // 这样取值 得到的是一个字符串，不方便后续传递图片给服务器
      // const fileObj = window.URL.createObjectURL(this.$refs.file.files[0])
      // 直接传值 blob对象
      const fileObj = this.$refs.file.files[0]
      this.cropImage = fileObj
      // 显示图片裁切
      this.isCropShow = true

      /**
       * 为了解决相同文件，不会触发change事件，
       * 所以在这里手动清空file 的value
       */
      this.$refs.file.value = ''
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
  overflow:hidden
}
</style>
