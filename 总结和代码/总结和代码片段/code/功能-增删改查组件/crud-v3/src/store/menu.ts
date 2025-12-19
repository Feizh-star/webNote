import type { RouteRecordRaw, RouteComponent } from 'vue-router'
import type { Router } from '@/types/router/router'
import { defineStore } from 'pinia'

import router from '@/router'
import { routes as constants } from '@/router'
import { getRoutes } from '@/api/menu'
import Layout from '@/layout/Layout.vue'
import RouterSocket from '@/layout/RouterSocket.vue'
import pathModule from 'path-browserify'

const pages = importPage()

let socketIndex = 1
export const useMenu = defineStore({
  id: 'menuTree',
  state: () => ({
    menuList: [] as Array<RouteRecordRaw>,
    currentMenu: {} as RouteRecordRaw,
    routePath: [] as any[],
  }),
  getters: {
    getMenuList: (state) => state.menuList,
    getCurrentMenu: (state) => state.currentMenu,
    getRouteNodePath: (state) => state.routePath,
    getRoutePath() {
      // @ts-ignore
      return pathModule.join(...this.getRouteNodePath.map((node) => node.path))
    },
  },
  actions: {
    async fetchMenuList() {
      try {
        let routes = await getRoutes()
        routes = addLayoutForSingleRoute(routes)
        const parsedRoute = parseRoutes(routes)
        this.menuList = [...constants, ...parsedRoute]
        // router.addRoute('', {
        //   path: '/:pathMatch(.*)*',
        //   name: "NotFound",
        //   redirect: '/404',
        //   meta: { hidden: true, }
        // })
        // console.log(this.menuList)
      } catch (error) {
        console.error(error)
      }
    },
    setCurrentMenu(crtMenu: RouteRecordRaw) {
      this.currentMenu = crtMenu
    },
    setRoutePath(rPath: any[]) {
      this.routePath = rPath
    },
  },
})

/**
 * 将原始路由衰转换为符合vue-router要求的路由表，并加入到router中
 * @param 原始器由表
 * @param parent 父路由名称，用于添加路由
 * @returns 符合vue-router要求的路由表
 */
function parseRoutes(routes: Router.MyRawRoute[], parent: string = ''): RouteRecordRaw[] {
  const parsedRoutes: RouteRecordRaw[] = []
  for (const raw of routes) {
    let component: RouteComponent | (() => Promise<RouteComponent>)
    if (raw.component === 'Layout') {
      component = Layout
    } else if (raw.component === 'RouterSocket') {
      component = RouterSocket
    } else {
      // component = () => import(`../views/${raw.component.replace('.vue', '')}.vue`)
      // webpack不能编译动态的import(),需要借助babel-plugin-dynamic-import-webpack
      // component = () => require(`@/views/${raw.component}`)
      component = pages[raw.component]
    }
    // 避免1级目录类型的路由节点名称重复(path是'/'的1级路由的name都是Layout)
    if (raw.name == 'Layout') raw.name = raw.name.concat(String(socketIndex++))
    const parsedRoute: RouteRecordRaw = {
      path: raw.path,
      component: component,
      name: raw.name,
      meta: raw.meta,
      redirect: raw.redirect || '',
      children: [],
    }
    router.addRoute(parent, parsedRoute)
    parsedRoutes.push(parsedRoute)
    parsedRoute.children = parseRoutes(raw.children || [], raw.name)
  }
  return parsedRoutes
}
/**
 * 为单层路由加上layout容器
 * @param routes 接口获取的路由表
 * @returns 处理后的路由表
 */
function addLayoutForSingleRoute(routes: Router.MyRawRoute[]): Router.MyRawRoute[] {
  return routes.map((r) => {
    let routeParse: Router.MyRawRoute = r
    if (r.name !== 'Layout' && (!r.children || r.children.length === 0)) {
      if (r.path.startsWith('/')) r.path = r.path.replace('/', '')
      routeParse = {
        path: '/',
        name: 'Layout',
        component: 'Layout',
        meta: {
          title: '',
          hidden: false,
        },
        children: [r],
      }
    }
    return routeParse
  })
}

/**
 * 导入页面文件
 */
function importPage() {
  const viewModules = import.meta.glob('@/views/**/*.vue')
  const modulesRemovedBase: { [propName: string]: any } = {}
  for (const path in viewModules) {
    modulesRemovedBase[path.replace('/src/views/', '')] = viewModules[path]
  }
  // console.log(modulesRemovedBase)
  return modulesRemovedBase
}
