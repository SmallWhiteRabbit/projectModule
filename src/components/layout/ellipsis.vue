<template>
  <a-popover placement="bottomRight" trigger="click" :overlay-class-name="'ellipsis hd_popover'">
    <template #content>啥也没有</template>
    <a-badge>
      <ellipsis-outlined />
    </a-badge>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Ellipsis',
  components: {
    EllipsisOutlined
  },
  setup() {
    return {}
  }
})
</script>
