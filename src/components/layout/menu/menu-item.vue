<template>
  <template v-for="item in menuList" :key="item.path">
    <a-menu-item v-if="!item.children" :key="item.path" @click="pageTo(item.path)">
      <template v-if="item.meta.icon" #icon>
        <IconAnt :icon="item.meta.icon"></IconAnt>
      </template>
      <span>{{ t(item.meta.title) }}</span>
    </a-menu-item>
    <a-sub-menu v-else :key="item.name" :popup-class-name="'aside_submenu'">
      <template v-if="item.meta.icon" #icon>
        <IconAnt :icon="item.meta.icon"></IconAnt>
      </template>
      <template #title>
        <span>{{ t(item.meta.title) }}</span>
      </template>
      <menu-item :menu-list="item.children"></menu-item>
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { RouterType } from '@/Router'
import { defineComponent } from 'vue'
import { toNext } from '@/Router'
import { IconAnt } from '@/components/common/icon'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'MenuItem',
  components: {
    IconAnt
  },
  props: {
    menuList: {
      type: Array as PropType<RouterType[]>
    }
  },
  setup() {
    const pageTo = (path: string) => {
      toNext({ path })
    }
    const { t } = useLocale()

    return { pageTo, t }
  }
})
</script>
