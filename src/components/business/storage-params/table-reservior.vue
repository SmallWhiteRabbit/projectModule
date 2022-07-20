<template>
  <my-table
    class="table-reservoir"
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :is-expand="true"
    :row-key="handleRow"
    @expandedRowsChange="handleExpandChange">
    <template #options="{ scope }">
      <a-button type="text" class="add" @click="handleAddStorage(scope.text)">{{ t('system.add') }}</a-button>
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
    </template>
    <template #expandedRowRender="{ scope }">
      <TableStorage :table-data="list[scope.index]" @updateUnitList="getUnitList"></TableStorage>
    </template>
  </my-table>
  <FormStorage :init-data="formStorage" :visible="isDrawerStorage" @cancel="cancelStorage" @success="successStorage"></FormStorage>
  <DataForm :init-data="formData" :visible="isDrawer" @cancel="cancel" @success="success"></DataForm>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { ITableRow as ITableStorageRow } from '@/config/table/business/storage-params/storage'
import type { ITableRow as ITableReservoirRow } from '@/config/table/business/storage-params/reservoir'
import TableStorage from './table-storage.vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import TableConfig from '@/config/table/business/storage-params/reservoir'
import FormStorage from './form-storage.vue'
import DataForm from './form-reservior.vue'
import { unitList, areaDel } from '@/utils/api/business/storage-params'
import { deleteConfirm } from '@/utils/confirm'
import { useLocale, deepClone } from 'youibot-plus'
import { $msg } from '@/utils/message'

export default defineComponent({
  name: 'TableReservior',
  components: {
    TableStorage,
    FormStorage,
    DataForm
  },
  props: {
    tableData: {
      type: Array as PropType<ITableReservoirRow[]>,
      default: [] as ITableReservoirRow[]
    }
  },
  emits: ['updateAreasList'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const state = reactive({
      formData: {} as ITableReservoirRow,
      formStorage: {} as ITableStorageRow,
      tableData: deepClone(props.tableData),
      list: [] as ITableStorageRow[][]
    })
    let isDrawer = ref(false)
    const { columns } = TableConfig

    const getIndexById = (id: string) => {
      let index = 0

      state.tableData.forEach((table: ITableReservoirRow, i: number) => {
        if (table.id === id) {
          index = i
        }
      })
      return index
    }
    const getUnitList = (id: string) => {
      unitList({ warehouseAreaId: id }).then(res => {
        let index = getIndexById(id)

        state.list[index] = res.data
      })
    }
    const handleExpandChange = (row: ITableReservoirRow) => {
      // 判断当前行是否展开
      getUnitList(row.id)
    }
    const handleEdit = (row: ITableReservoirRow) => {
      isDrawer.value = true
      state.formData = { ...row }
    }
    const handleDel = (row: ITableReservoirRow) => {
      deleteConfirm(`${t('message.delete')}${row.name}`, t('message.Tips'), t('message.ok'), t('message.cancel'), () => {
        areaDel(row.id).then(() => {
          $msg.success({ message: t('system.success') })
          emit('updateAreasList')
        })
      })
    }

    const cancel = () => {
      isDrawer.value = false
    }
    const success = () => {
      isDrawer.value = false
      emit('updateAreasList')
    }

    let isDrawerStorage = ref(false)
    const cancelStorage = () => {
      isDrawerStorage.value = false
    }
    const successStorage = (id: string) => {
      isDrawerStorage.value = false
      getUnitList(id)
    }
    const handleAddStorage = (row: ITableReservoirRow) => {
      state.formStorage = {
        amount: 1,
        code: '',
        id: '',
        layoutColumn: 1,
        layoutLayer: 1,
        layoutRow: 1,
        type: '',
        warehouseAreaId: row.id,
        cells: []
      }
      isDrawerStorage.value = true
    }
    const handleRow = (record: { id: string }) => {
      return record.id
    }

    return {
      handleEdit,
      handleDel,
      handleExpandChange,
      isDrawer,
      cancel,
      success,
      ...toRefs(state),
      handleAddStorage,
      successStorage,
      cancelStorage,
      isDrawerStorage,
      getUnitList,
      columns,
      t,
      handleRow
    }
  }
})
</script>
<style lang="less" scoped>
.table-reservoir {
  padding: 20px 0;
}
</style>
