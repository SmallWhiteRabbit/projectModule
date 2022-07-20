<template>
  <a-layout class="layout">
    <navView></navView>
    <a-layout>
      <asideView></asideView>
      <mainContent></mainContent>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import asideView from '@/components/layout/aside-view.vue'
import navView from '@/components/layout/nav-view.vue'
import content from '@/components/layout/content.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Layout',
  components: {
    asideView,
    navView,
    mainContent: content
  },
  setup() {
    return {}
  }
})
</script>
