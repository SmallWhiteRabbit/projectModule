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
import type { ITableRow } from '@/config/table/business/storage-params/storage-params'
import type { PropType } from 'vue'
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { required_check } from '@/utils/Form'
import { warehouseAdd, warehouseEdit } from '@/utils/api/business/storage-params'
import { useLocale, deepClone } from 'youibot-plus'
import FormConfig from '@/config/form/business/storage-params/storage-params'
import useTree from '@/hooks/use-tree'
export default defineComponent({
  name: 'FormStorageParams',
  props: {
    initData: {
      type: Object as PropType<ITableRow>
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'success'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { formListItem, formData } = FormConfig

    type TFormData = typeof formData
    const state = reactive({
      formData: deepClone(props.initData) as TFormData,
      formListItem
    })

    const rules = [required_check()]
    const cancel = () => {
      emit('cancel')
    }

    const addData = () => {
      warehouseAdd(state.formData).then(() => {
        emit('success')
      })
    }
    const editData = () => {
      warehouseEdit(state.formData).then(() => {
        emit('success')
      })
    }

    const success = () => {
      if (state.formData.id) {
        editData()
      } else {
        addData()
      }
    }
    const getTreeData = async () => {
      const { getFactoryTreeList } = useTree()

      state.formListItem[2].treeList = await getFactoryTreeList()
    }

    const FactoryChange = (data: { id: string; name: string }) => {
      state.formData.factoryZoneId = data.id
      state.formData.factoryZoneName = data.name
    }

    watchEffect(() => {
      if (props.initData) {
        state.formData = deepClone(props.initData)
      }

      if (props.visible) {
        getTreeData()
      }
    })
    return {
      success,
      cancel,
      rules,
      ...toRefs(state),
      FactoryChange,
      t
    }
  }
})
</script>
