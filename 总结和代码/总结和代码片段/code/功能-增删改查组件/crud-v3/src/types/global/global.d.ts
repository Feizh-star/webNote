declare global {
  type Recordable<T = any> = Record<string, T>
  declare interface ImportMetaEnv {
    VITE_BASE_URL: string
  }
  declare interface Window {
    UserConfig: {
      verificationCode: boolean
      clientId: string
      useSideBar: boolean
      showBreadcrumb: boolean
    }
  }
}

export {}
