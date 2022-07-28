<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" class="menu-container">
    <MenuItem :menu-list="menuList"></MenuItem>
  </a-menu>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { RouterType } from '@/Router'
import { defineComponent, ref, watchEffect } from 'vue'
import MenuItem from './menu-item.vue'

import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Asidemenu',
  components: {
    MenuItem
  },
  props: {
    menuList: {
      type: Array as PropType<RouterType[]>
    }
  },
  setup() {
    const route = useRoute()
    const selectedKeys = ref([route.fullPath])
    const matched = route.matched
    const matchedLen = matched.length
    const openKeys = ref<string[]>([])

    if (matchedLen > 2) {
      openKeys.value = [matched[matchedLen - 2].path]
    }
    watchEffect(() => {
      selectedKeys.value = [route.fullPath]
    })

    return { selectedKeys, openKeys }
  }
})
</script>
