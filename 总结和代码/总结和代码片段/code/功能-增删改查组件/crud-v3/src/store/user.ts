import { login, logout, getInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [] as string[],
    permissions: [] as string[],
  }),
  actions: {
    login(userInfo: ILoginParams) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res: any) => {
            setToken(res.token)
            this.token = res.token
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res: any) => {
            const user = res.user

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            // const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;
            // this.avatar = avatar;
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
