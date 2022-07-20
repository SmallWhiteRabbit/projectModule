<template>
  <my-drawer-form
    v-model:formData="formData"
    :visible="visible"
    :title="formData.id ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
</template>

<script lang="ts">
import type { ITableRow as ITableReservoirRow } from '@/config/table/business/storage-params/reservoir'
import type { PropType } from 'vue'
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { required_check } from '@/utils/Form'
import { areaEdit, areaAdd } from '@/utils/api/business/storage-params'
import { useLocale, deepClone } from 'youibot-plus'
import FormConfig from '@/config/form/business/storage-params/reservoir'
export default defineComponent({
  name: 'FormReservoir',
  props: {
    initData: {
      type: Object as PropType<ITableReservoirRow>,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'success'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { formListItem } = FormConfig
    const state = reactive({
      formData: deepClone(props.initData),
      formListItem
    })

    watchEffect(() => {
      state.formData = deepClone(props.initData)
    })

    const rules = [required_check()]

    const cancel = (): void => {
      emit('cancel')
    }
    const addData = (): void => {
      areaAdd(state.formData).then(() => {
        emit('success')
      })
    }
    const editData = (): void => {
      areaEdit(state.formData).then(() => {
        emit('success')
      })
    }

    /**
     *
     */
    function success() {
      if (state.formData.id) {
        editData()
      } else {
        addData()
      }
    }

    return {
      success,
      cancel,
      rules,
      ...toRefs(state),
      t
    }
  }
})
</script>
