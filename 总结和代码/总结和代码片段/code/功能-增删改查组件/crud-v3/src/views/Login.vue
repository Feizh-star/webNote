<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { getValidImage } from '@/api/user'

import type { IAnyObject } from '@/types/global/common'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const UserConfig = window.UserConfig

// 获取验证码
const validImage = ref('')
async function getCode() {
  if (!UserConfig.verificationCode) return
  try {
    const res: any = await getValidImage()
    if (res.code === 200) {
      validImage.value = 'data:image/gif;base64,' + res.img
      formData.uuid = res.uuid
    }
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => getCode())

const loginForm = ref()
const formData = reactive({
  password: '',
  username: '',
  code: '',
  uuid: '',
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'change' }],
  code: [{ required: UserConfig.verificationCode, message: '请输入验证码', trigger: 'change' }],
})
const agree = ref(true)
function submitForm() {
  const elForm = loginForm.value
  if (!agree.value) {
    ElMessage.error({
      message: '请勾选同意服务协议和隐私政策',
    })
    return
  }
  elForm.validate((valid: boolean, object: { [p: string]: any }) => {
    if (valid) {
      login()
    } else if (object) {
      const keys = new Set(Object.keys(object))
      let msg = ''
      if (keys.has('username') || keys.has('password')) {
        msg = '请输入用户名和密码'
      } else {
        msg = '请填写验证码'
      }
      ElMessage.error({
        message: msg,
      })
    }
  })
}
function login() {
  const userInfo: IAnyObject & typeof formData = {
    ...formData,
  }
  if (!UserConfig.verificationCode) {
    Reflect.deleteProperty(userInfo, 'code')
    Reflect.deleteProperty(userInfo, 'uuid')
  }
  if (UserConfig.clientId) {
    userInfo.clientid = UserConfig.clientId
  }
  userStore
    .login(userInfo)
    .then(() => {
      const redirect = route.query?.redirect || '/'
      router.push({ path: redirect as string })
    })
    .catch((error) => {
      console.error(error)
      getCode()
    })
}
</script>

<template>
  <div class="login-page">
    <section class="login-main">
      <div class="login-form">
        <h3 class="login-title">
          <div>欢迎登录</div>
          <div></div>
        </h3>
        <div class="form-title">
          <span>账号登录</span>
        </div>
        <div class="form-content">
          <el-form
            :model="formData"
            status-icon
            :rules="rules"
            ref="loginForm"
            size="large"
            label-width="100px"
          >
            <el-form-item prop="username" label-width="0">
              <el-input
                type="text"
                v-model="formData.username"
                autocomplete="off"
                placeholder="请输入您的账号"
                @keyup.enter="submitForm"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label-width="0">
              <el-input
                type="password"
                v-model="formData.password"
                autocomplete="off"
                placeholder="请输入您的密码"
                show-password
                @keyup.enter="submitForm"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              label-width="0"
              class="valid-code"
              v-if="UserConfig.verificationCode"
            >
              <div class="valid-input">
                <el-input
                  type="text"
                  v-model="formData.code"
                  autocomplete="off"
                  placeholder="验证码"
                  @keyup.enter="submitForm"
                ></el-input>
              </div>
              <div class="valid-image" click="getCode">
                <img :src="validImage" alt="验证码" />
              </div>
            </el-form-item>
            <div class="btns">
              <el-button type="primary" @click="submitForm">登录</el-button>
            </div>
          </el-form>
        </div>
        <div class="service-protocol">
          <el-checkbox v-model="agree"><span></span></el-checkbox>
          <span class="service-text">
            登录即表示您已同意平台<span class="service-name">服务协议</span>和<span
              class="service-name"
              >隐私政策</span
            >
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  height: 100%;
  // background: url('@/assets/imgs/loginbg@2x.png') no-repeat;
  background-size: cover;
  background-position: center;
}
.login-main {
  height: 100%;
  position: relative;
  .login-form {
    width: 448px;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    top: 48%;
    transform: translate(-50%, -50%);
    left: 50%;
    padding: 62px 52px;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .login-title {
      padding-bottom: 42px;
      margin: 0;
      font-size: 18px;
      font-weight: 700;
    }
    .form-title {
      color: #1890ff;
      font-size: 16px;
      font-weight: 700;
      padding-bottom: 10px;
      border-bottom: 2px solid #1890ff;
    }
    .form-content {
      padding: 30px 0 20px;
      :deep(.el-form) {
        .el-input__wrapper {
          background-color: #f4f4f6;
          border-radius: 0;
          box-shadow: none;
        }
      }
      .btns {
        padding-top: 20px;
        > button {
          width: 100%;
          border-radius: 0;
          font-size: 16px;
        }
      }
    }
    .service-protocol {
      display: flex;
      align-items: center;
      .service-text {
        font-size: 12px;
        color: #a9b0bb;
        .service-name {
          color: #4484ff;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
  }
  :deep(.el-form-item) {
    &.valid-code {
      > .el-form-item__content {
        > .valid-input {
          width: 67%;
        }
        > .valid-image {
          width: 33%;
          padding-left: 10px;
          > img {
            width: 100%;
            height: 100%;
            vertical-align: bottom;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
