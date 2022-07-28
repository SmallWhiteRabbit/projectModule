import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '@/Store'
export type RouterType = RouteRecordRaw & {
  meta: {
    title: string
  }
  children?: RouterType[]
}

const routes: Array<RouterType> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Layout/Index.vue'),
    meta: {
      title: ''
    },
    children: []
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 获取routers下最底层子集的第一个router
const getTreeNode = (routers: Array<RouterType>): RouterType => {
  const children = routers[0].children

  if (children && children.length > 0) {
    return getTreeNode(children)
  } else {
    return routers[0]
  }
}

router.beforeEach((to, from, next) => {
  next()
})
/**
 * 路由跳转
 *
 * @param to 下一个路由参数
 */
export function toNext(to: RouteLocationRaw): void {
  router.push(to)
}
/**
 * 返回
 */
export function back(): void {
  router.back()
}
/**
 * 获取当前路由
 *
 * @returns
 */
export function getRoute() {
  return router.currentRoute.value
}
/**
 * 获取路由query参数类型s参数
 *
 * @param type query参数类型
 * @returns
 */
export function getQuery(type: string) {
  const $route = getRoute()

  return $route.query[type]
}
/**
 * 获取路由params参数
 *
 * @param type params参数类型
 * @returns
 */
export function getParams(type: string) {
  const $route = getRoute()

  return $route.params[type]
}

export function toLogin(): void {
  router.push({ path: '/login' })
}

/**
 * @param routers
 */
function toDefaultPath(routers: Array<RouterType>): void {
  const curRoute = getRoute()
  let path = curRoute.fullPath //当前路径

  if (path === '/' || path === '/login') {
    const curMenu = getTreeNode(routers)

    path = curMenu.path
  }
  toNext({ path })
}

/**
 * 动态路由
 *
 * @param routers
 */
export function routerPackag(routers: Array<RouterType>): void {
  const modules = import.meta.glob('../pages/**/**.vue')

  /**
   * @param routers
   * @param routerData
   */
  function generateRouter(routers: Array<RouterType>, routerData: RouteRecordRaw[] = []): void {
    routers.forEach(routerItem => {
      // 路由存在子节点,则默认redirect为第一个子节点路径
      const children = routerItem.children
      let redirect = ''

      if (children && children.length > 0) {
        redirect = children[0].path
      }
      const routerItemData: RouteRecordRaw = {
        path: routerItem.path,
        redirect,
        name: routerItem.meta.title,
        component: modules[`../pages${routerItem.component}/Index.vue`], //本地&打包后都正常
        meta: {
          title: routerItem.meta.title,
          icon: routerItem.meta.icon
        }
      }

      if (routerItem.children && routerItem.children.length) {
        routerItemData.children = []
        generateRouter(routerItem.children, routerItemData.children)
      }
      routerData.push(routerItemData)
      router.addRoute('Index', routerItemData)
    })
  }
  generateRouter(routers)
  store.commit('SET_MENULIST', routers)
  toDefaultPath(routers)
}

export default router
