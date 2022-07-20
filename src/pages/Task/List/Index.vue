<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData"></my-filter>
  <my-table
    :columns="columns"
    :data="tableData"
    :pagination="pageState.pagination"
    :loading="pageState.isLoading"
    :options-list="optionsList"></my-table>
  <my-drawer-form
    v-model:formData="state.formData"
    :visible="state.visible"
    :is-btn-fix-bottom="false"
    :title="t('system.edit')"
    :form-list="state.formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button @click="handleDel">
      <delete-outlined />
      删除
    </a-button>
    <a-button @click="handleExport">
      <upload-outlined />
      导出
    </a-button>
    <a-button type="primary">
      <plus-outlined />
      新建
    </a-button>
  </section>
  <my-modal-form
    v-model:formData="state.formData"
    :visible="state.modalVisible"
    :title="t('system.changePsw')"
    :form-list="formListItem"
    @cancel="modalCancel"
    @success="modalSuccess"></my-modal-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FilterConfig from '@/config/filter/task/list'
import TableConfig from '@/config/table/task/list'
import usePage from '@/hooks/use-page'
import type { ITableRow } from './type'
import { formListItem } from '@/config/form/task/list'
import { useLocale } from 'youibot-plus'
import { deleteConfirm } from '@/utils/confirm'
import { DeleteOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
const { columns } = TableConfig
const { pageState } = usePage({})
const { t } = useLocale()
const { filterConfigList, filterData } = FilterConfig
const state = reactive({
  formListItem,
  formData: {
    taskName: '',
    status: '',
    manager: '',
    entryTime: '',
    entryName: ''
  } as ITableRow,
  visible: false,
  modalVisible: false,
  edutId: ''
})
let tableData: unknown[] = []

for (let i = 1; i < 50; i++) {
  tableData.push({
    taskName: '112',
    status: i % 3,
    manager: '1212',
    entryName: 'green',
    entryTime: '2020-05-20 14:30:00'
  })
}
/**
 * 编辑
 *
 * @param {ITableRow} row table
 */
function handleEdit(row: ITableRow) {
  state.formData = { ...row }
  state.visible = true
}

let optionsList = [
  {
    label: 'system.edit',
    clickFunc: handleEdit
  },
  {
    label: 'system.del',
    clickFunc: () => {}
  }
]

/**
 *表单提交
 */
function success() {
  state.visible = false
}
/**
 *关闭表单
 */
function cancel() {
  state.visible = false
}

/**
 * 成功回调
 */
function modalSuccess() {
  state.modalVisible = false
}
/**
 *关闭表单
 */
function modalCancel() {
  state.modalVisible = false
}

/**
 *导入
 */
function handleExport() {
  state.modalVisible = true
}

/**
 * 删除
 */
function handleDel() {
  deleteConfirm(`${t('message.delete')}测试`, t('message.Tips'), t('message.ok'), t('message.cancel'), () => {})
}
</script>
