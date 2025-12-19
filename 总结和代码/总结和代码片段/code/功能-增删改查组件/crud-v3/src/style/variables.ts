import type { App } from 'vue'
export const defaultStyle = {
  textColor: '#4D4D4D',
  textHcolor: '#2B93FF',
}
export const defaultStylePlugin = {
  install(app: App<Element>) {
    app.config.globalProperties.$defaultStyle = defaultStyle
  },
}
