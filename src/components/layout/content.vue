<template>
  <a-layout-content class="main-view">
    <a-breadcrumb class="router-guide">
      <a-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
        {{ t(item.meta.title) }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <section class="content-module">
      <router-view></router-view>
    </section>
  </a-layout-content>
</template>

<script lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'MainContent',
  setup() {
    const { t } = useLocale()
    const route = useRoute()
    let breadcrumbList = ref<RouteLocationMatched[]>([])

    watchEffect(() => {
      breadcrumbList.value = route.matched.slice(1)
    })

    return { breadcrumbList, t }
  }
})
</script>
