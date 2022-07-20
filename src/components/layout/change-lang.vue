<template>
  <a-popover placement="bottomRight" trigger="hover" :overlay-class-name="'langList hd_popover'">
    <template #content>
      <a-menu @click="handleLang">
        <a-menu-item v-for="item in langList" :key="item.lang" :icon="item.icon" :command="item.lang">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>

    <a-badge>
      <global-outlined :style="{ fontSize: '20px' }" />
    </a-badge>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { langLocalData } from '@/utils/storage/local'
import { GlobalOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import store from '@/Store'
export default defineComponent({
  name: 'ChangeLang',
  components: { GlobalOutlined },
  setup() {
    interface langType {
      [key: string]: { icon: string; name: string; lang: string }
    }
    const langList: langType = reactive({
      zhcn: {
        icon: '',
        name: '中文',
        lang: 'cn'
      },
      en: {
        icon: '',
        name: 'English',
        lang: 'en'
      }
    })

    const handleLang: MenuProps['onClick'] = e => {
      const lang = e.key.toString()

      store.commit('SET_LANG', lang)
      langLocalData(lang)
    }

    return { langList, handleLang }
  }
})
</script>
