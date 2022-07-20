<template>
  <a-layout-sider v-model:collapsed="collapsed" class="aside-view" width="231" collapsible :trigger="null">
    <AsideMenu :menu-list="menuList"></AsideMenu>
    <IconAnt :icon="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" class="icon-collapsed" @click="toggleCollapsed"></IconAnt>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import AsideMenu from '@/components/layout/menu/index.vue'
import store from '@/Store'
import { IconAnt } from '@/components/common/icon'
export default defineComponent({
  name: 'AsideView',
  components: {
    AsideMenu,
    IconAnt
  },
  setup() {
    const menuList = ref(
      computed(() => {
        return store.getters.getAsideMenu
      })
    )
    const collapsed = ref<boolean>(false)

    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
      store.commit('SET_COLLAPSED', collapsed.value)
    }

    return { menuList, collapsed, toggleCollapsed }
  }
})
</script>
