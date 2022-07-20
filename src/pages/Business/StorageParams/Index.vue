<template>
  <my-table
    class="table-warehouse"
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :loading="isLoading"
    :is-expand="true"
    :options-list="optionsList"
    :row-key="handleRow">
    <!-- <template #options="{ scope }">
      <a-button type="text" class="add" @click="handleAddReservior(scope.text)">{{ t('system.add') }}</a-button>
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
    </template> -->
    <template #expandedRowRender="{ scope }">
      <TableReservior :table-data="scope.record.areas" @updateAreasList="getTableList"></TableReservior>
    </template>
  </my-table>
  <DataForm :init-data="formData" :visible="isDrawer" @cancel="cancel" @success="success"></DataForm>
  <FormReservior
    :init-data="formReservior"
    :visible="isDrawerReservior"
    @cancel="cancelReservior"
    @success="successReservior"></FormReservior>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/business/storage-params/storage-params'
import type { ITableRow as ITableReservoirRow } from '@/config/table/business/storage-params/reservoir'
import TableConfig from '@/config/table/business/storage-params/storage-params'

import TableReservior from '@/components/business/storage-params/table-reservior.vue'
import { defineComponent, ref, reactive, toRefs } from 'vue'
import DataForm from '@/components/business/storage-params/form.vue'
import FormReservior from '@/components/business/storage-params/form-reservior.vue'
import { tree, warehouseDel } from '@/utils/api/business/storage-params'
import { deleteConfirm } from '@/utils/confirm'
import { $msg } from '@/utils/message'
import { useLocale } from 'youibot-plus'

import FormConfig from '@/config/form/business/storage-params/storage-params'
export default defineComponent({
  name: 'StorageParams',
  components: {
    TableReservior,
    DataForm,
    FormReservior
  },
  setup() {
    const { formData } = FormConfig
    const { columns } = TableConfig
    const { t } = useLocale()

    const state = reactive({
      formData: {} as ITableRow,
      formReservior: {} as ITableReservoirRow,
      isLoading: false
    })
    let tableData = ref<ITableRow[]>([])
    let isDrawer = ref(false)

    const handleEdit = (row: ITableRow) => {
      state.formData = { ...row }
      state.formData.areas = undefined
      isDrawer.value = true
    }
    const handleAdd = () => {
      state.formData = formData
      isDrawer.value = true
    }
    const getTableList = () => {
      state.isLoading = true
      tableData.value = []
      tree()
        .then(res => {
          tableData.value = res.data
        })
        .finally(() => {
          state.isLoading = false
        })
    }

    const handleDel = (row: ITableRow) => {
      deleteConfirm(`${t('message.delete')}${row.name}`, t('message.Tips'), t('message.ok'), t('message.cancel'), () => {
        warehouseDel(row.id).then(() => {
          $msg.success({ message: t('system.success') })
          getTableList()
        })
      })
    }

    const cancel = () => {
      isDrawer.value = false
    }
    const success = () => {
      isDrawer.value = false
      getTableList()
    }
    let isDrawerReservior = ref(false)
    const cancelReservior = () => {
      isDrawerReservior.value = false
    }
    const successReservior = () => {
      isDrawerReservior.value = false
      getTableList()
    }
    const handleAddReservior = (row: ITableReservoirRow) => {
      state.formReservior = {
        code: '',
        id: '',
        name: '',
        warehouseId: row.id
      }
      isDrawerReservior.value = true
    }

    const optionsList = [
      {
        label: 'system.add',
        clickFunc: handleAdd
      },
      {
        label: 'system.edit',
        clickFunc: handleEdit
      },
      {
        label: 'system.del',
        clickFunc: handleDel
      }
    ]
    const handleRow = (record: { id: string }) => record.id

    getTableList()

    return {
      tableData,
      handleEdit,
      handleDel,
      isDrawer,
      cancel,
      success,
      ...toRefs(state),
      handleAdd,
      isDrawerReservior,
      cancelReservior,
      successReservior,
      handleAddReservior,
      columns,
      getTableList,
      optionsList,
      t,
      handleRow
    }
  }
})
</script>
