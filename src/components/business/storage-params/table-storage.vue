<template>
  <my-table class="table-storage" :columns="columns" :data="tableData" :pagination="false">
    <template #specification="{ scope }">{{ scope.text.layoutRow }}/{{ scope.text.layoutLayer }}/{{ scope.text.layoutColumn }}</template>
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
    </template>
  </my-table>
  <DataForm :init-data="formData" :visible="isDrawer" @cancel="cancel" @success="success"></DataForm>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { ITableRow as ITableStorageRow } from '@/config/table/business/storage-params/storage'
import { defineComponent, ref, reactive, toRefs } from 'vue'
import DataForm from './form-storage.vue'
import { deleteConfirm } from '@/utils/confirm'
import { $msg } from '@/utils/message'
import { unitDel } from '@/utils/api/business/storage-params'
import { useLocale } from 'youibot-plus'
import TableConfig from '@/config/table/business/storage-params/storage'
export default defineComponent({
  name: 'TableStorage',
  components: {
    DataForm
  },
  props: {
    tableData: {
      type: Array as PropType<ITableStorageRow[]>,
      default: [] as ITableStorageRow[]
    }
  },
  emits: ['updateUnitList'],
  setup(props, { emit }) {
    const { t } = useLocale()
    let isDrawer = ref(false)
    const state = reactive({
      formData: {} as ITableStorageRow
    })
    const { columns } = TableConfig
    const handleEdit = (row: ITableStorageRow) => {
      state.formData = { ...row }
      isDrawer.value = true
    }
    const handleDel = (row: ITableStorageRow) => {
      deleteConfirm(`${t('message.delete')}${row.code}`, t('message.Tips'), t('message.ok'), t('message.cancel'), () => {
        unitDel(row.id).then(() => {
          $msg.success({ message: t('system.success') })
          emit('updateUnitList', row.id)
        })
      })
    }

    const cancel = () => {
      isDrawer.value = false
    }
    const success = (id: string) => {
      isDrawer.value = false
      emit('updateUnitList', id)
    }

    return { handleEdit, handleDel, isDrawer, cancel, success, ...toRefs(state), columns, t }
  }
})
</script>
<style lang="less" scoped>
.table-storage {
  padding: 20px 0;
}
</style>
