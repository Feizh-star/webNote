import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { h } from 'vue'
import Layout from '@/layout/Layout.vue'
import { useMenu } from '@/store/menu'
import { filterTreeNode } from '@/utils/tools'
import pathModule from 'path-browserify'

export const routes: Array<RouteRecordRaw> = [
  // 默认页面和首页
  {
    path: '/',
    // component: Layout, // 如果首页不想展示Layout布局，把这个注释掉
    redirect: '/index',
    meta: {
      hidden: true, // 如果首页不想展示菜单，把这个设为true
      alwaysShow: false,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
          hidden: false,
        },
        props: { redirect: '/testmenu' }, // 如果redirect被设置，则Index将立即跳转，没有redirect时views/Index.vue是默认首页
        component: () => import('@/views/Index.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/Login.vue'),
  },
  // 没匹配到的路由都会匹配这个，进入错误页面
  {
    path: '/:pathMatch(.*)*',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/Error/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  sensitive: true,
})

router.afterEach((to: RouteLocationNormalized) => {
  setCurrentMenu(to) // 设置当前菜单
})

function setCurrentMenu(to: RouteLocationNormalized) {
  const menu = useMenu()
  const fullpath = to.fullPath
  const currentRoute = filterTreeNode(
    menu.getMenuList,
    fullpath,
    { id: 'path' },
    (path: any, fPath: any, node: any, parents: any) => {
      const paths = [...parents.map((p: any) => p.path), path]
      const currentFullPath = pathModule.join(...paths)
      return currentFullPath === fPath
    }
  )
  menu.setRoutePath(currentRoute ? [...currentRoute._stack, currentRoute] : [])
  menu.setCurrentMenu(currentRoute || {})
}

export default router
