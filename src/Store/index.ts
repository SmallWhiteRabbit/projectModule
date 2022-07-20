import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import { langLocalData, routerLocalData } from '@/utils/storage/local'
import { getInfo, getRouters } from '@/utils/api/login'
import { systemConfig } from '@/utils/api/common'
import type { RouterType } from '@/Router/index'
import { routerPackag } from '@/Router/index'
export interface IErrorMsg {
  error_code?: string
  error_tip?: string
  error_help?: string
}
interface ISystemParams {
  sysLogoPad: string
  sysLogoPc: string
  sysName: string
}
export interface State {
  browserType: string
  isPc: boolean
  lang: string
  menuList: Object
  userinfo: Object
  routers: Array<RouterType>
  curMenuList: Array<RouterType>
  systemParams: ISystemParams
  asideMenu: Array<RouterType>
  collapsed: boolean
}

export const key: InjectionKey<Store<State>> = Symbol('store')

/**
 * @returns { Store<State>} 返回值
 */
export function useStore(): Store<State> {
  return baseUseStore(key)
}

const baseState: State = {
  //判断浏览器类型
  browserType: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'pc',
  isPc: !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
  lang: langLocalData() || 'zhcn',
  menuList: [],
  userinfo: {},
  routers: [],
  curMenuList: [],
  systemParams: {
    sysLogoPad: '',
    sysLogoPc: '',
    sysName: ''
  },
  asideMenu: [],
  collapsed: false
}

/**
 * @param {State} state 默认数据
 * @returns { Store<State>} 返回值
 */
export function getStore(state = baseState): Store<State> {
  return createStore<State>({
    state() {
      return state
    },
    mutations: {
      SET_LANG: (state, data) => {
        state.lang = data
      },
      SET_MENULIST: (state, data) => {
        state.menuList = data
      },
      SET_USERINFO: (state, data) => {
        state.userinfo = data
      },
      SET_ROUTERS: (state, data) => {
        state.routers = data
      },
      SET_CUR_MENULIST: (state, data) => {
        state.curMenuList = data
      },
      SET_SYSTEM_PARAMS: (state, data) => {
        state.systemParams = data
      },
      SET_ASIDE_MENU: (state, data) => {
        state.asideMenu = data
      },
      SET_COLLAPSED: (state, data) => {
        state.collapsed = data
      }
    },
    getters: {
      getIsPc(state) {
        return state.isPc
      },
      getBrowserType(state) {
        return state.browserType
      },
      getLang(state): string {
        return state.lang
      },
      getMenuList(state) {
        return state.menuList
      },
      getCurMenuList(state) {
        return state.curMenuList
      },
      getSyatemParams(state) {
        return state.systemParams
      },
      getAsideMenu(state) {
        return state.asideMenu
      },
      getCollapsed(state) {
        return state.collapsed
      }
    },
    actions: {
      SET_MENULIST({ commit }, menuList) {
        commit('SET_MENULIST', menuList)
      },
      SET_USERINFO({ commit }) {
        getInfo().then(res => {
          const { user } = res.data

          commit('SET_USERINFO', user)
        })
      },
      SET_ROUTERS() {
        getRouters().then(res => {
          const { data } = res

          routerLocalData(JSON.stringify(data))
          routerPackag(data)
        })
      },
      SET_SYSTEM_PARAMS: ({ commit }) => {
        systemConfig().then(res => {
          const { data } = res
          const list = {
            sysLogoPad: data['sys.logo.pad'],
            sysLogoPc: data['sys.logo.pc'],
            sysName: data['sys.name']
          }

          commit('SET_SYSTEM_PARAMS', list)
        })
      }
    }
  })
}

export const store = getStore()

export default store
