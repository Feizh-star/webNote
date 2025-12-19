// 自定义类型申明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $defaultStyle: { [propName: string]: string }
  }
}
export {}
