import { RouteMeta } from 'vue-router'

declare namespace Router {
  interface MyRawRoute {
    path: string
    name: string
    component: string
    redirect?: string
    hidden?: boolean
    meta?: RouteMeta
    children?: Array<MyRawRoute> | null
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    icon?: {
      type: 'img' | 'class'
      value: string
    }
  }
}
