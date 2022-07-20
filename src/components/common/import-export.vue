<template>
  <a-button class="download" @click="handleDownload">{{ t('system.templateDownload') }}</a-button>
  <a-upload class="templateImport" action="" :show-upload-list="false" :custom-request="handleHttpRequest">
    <a-button class="import">{{ t('system.exportBatch') }}</a-button>
  </a-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { create_link } from '@/utils/download'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'ImportExport',
  props: {
    templateUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['fileUpload'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const handleDownload = () => {
      create_link(props.templateUrl)
    }
    const handleHttpRequest = (params: { file: File }) => {
      let { file } = params

      emit('fileUpload', file)
    }

    return {
      handleDownload,
      handleHttpRequest,
      t
    }
  }
})
</script>
