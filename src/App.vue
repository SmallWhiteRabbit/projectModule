<template>
  <a-config-provider :locale="locale">
    <yi-config-provider :locale="locale">
      <router-view></router-view>
    </yi-config-provider>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import en from '@/plugins/langs/en'
import cn from '@/plugins/langs/zh-cn'
import store from './Store'

export default defineComponent({
  name: 'App',
  setup() {
    store.dispatch('SET_ROUTERS')
    store.dispatch('SET_SYSTEM_PARAMS')

    const locale = computed(() => {
      let message = en

      switch (store.state.lang) {
        case 'en':
          message = en
          break
        case 'cn':
          message = cn
          break
        default:
          break
      }
      return message
    })
    // 全局注入

    return {
      locale
    }
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
