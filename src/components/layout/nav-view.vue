<template>
  <a-layout-header class="nav-view">
    <section class="header-left" :class="{ collapsed: $store.getters.getCollapsed }">
      <a-image class="logo" :width="24" :src="logo" />
      <span class="system-title">{{ $store.state.systemParams.sysName }}</span>
    </section>
    <ul class="header-middle">
      <li v-for="item in allMenu" :key="item.path" :class="{ 'is-active': judgeIsCur(item) }" @click="handleMenu(item)">
        <IconAnt :icon="item.meta.icon"></IconAnt>
        <span class="menu-name">{{ t(item.meta.title) }}</span>
      </li>
    </ul>
    <section class="header-right">
      <ChangeLang></ChangeLang>
      <Message></Message>
      <User></User>
      <Ellipsis></Ellipsis>
    </section>
  </a-layout-header>
</template>

<script lang="ts">
import User from '@/components/layout/user.vue'
import ChangeLang from '@/components/layout/change-lang.vue'
import Message from '@/components/layout/message.vue'
import Ellipsis from '@/components/layout/ellipsis.vue'
import { defineComponent, ref, watchEffect, computed } from 'vue'
import type { RouterType } from '@/Router'
import { getRoute, toNext } from '@/Router'
import { IconAnt } from '@/components/common/icon'
import store from '@/Store'
import logo from '@/assets/images/logo.png'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'NavView',
  components: {
    User,
    ChangeLang,
    IconAnt,
    Message,
    Ellipsis
  },
  setup() {
    const { t } = useLocale()

    // 设置初始化默认值
    const allMenu = ref(
      computed(() => {
        return store.getters.getMenuList
      })
    )

    const menuList = ref<RouterType[]>([])

    watchEffect(() => {
      const curRouter = getRoute().path

      if (curRouter !== '/') {
        allMenu.value.forEach((menu: RouterType) => {
          const curPath = getRoute().path.split('/')[1]
          const menuPath = menu.path.split('/')[1]

          if (menuPath === curPath && menu.children) {
            menuList.value = menu.children
          }
        })
      } else if (allMenu.value.length > 0) {
        menuList.value = allMenu.value[0].children
      }
      store.commit('SET_ASIDE_MENU', menuList)
    })

    const handleMenu = (menu: RouterType) => {
      if (menu.children) {
        menuList.value = menu.children
      }
      toNext({ path: menu.path })
      store.commit('SET_ASIDE_MENU', menuList)
    }
    const judgeIsCur = (menu: RouterType) => {
      const curPath = getRoute().path.split('/')[1]
      const menuPath = menu.path.split('/')[1]

      return menuPath === curPath
    }

    return { menuList, handleMenu, allMenu, judgeIsCur, logo, t }
  }
})
</script>
