<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table
    :columns="columns"
    :data="pageState.tableData"
    :pagination="pageState.pagination"
    :loading="pageState.isLoading"
    @change="handleTableChange">
    <template #configType="{ scope }">
      <span>{{ t('systemTool.parameter.' + scope.text.configType) }}</span>
    </template>
    <template #status="{ scope }">
      <div @click="switchClick(scope.text)">
        <a-switch
          v-model:checked="scope.text.status"
          class="ml-2"
          active-color="#13ce66"
          :un-checked-value="'1'"
          :checked-value="'0'"
          @change="switchChange" />
      </div>
    </template>
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
      <a-button type="text" class="once" @click="handleOnce(scope.text)">{{ t('schedule.once') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="state.formData"
    :visible="isDrawer"
    :title="state.formData.jobId ? t('system.edit') : t('system.add')"
    :form-list="state.formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts" setup>
import type { ITableRow } from '@/config/table/system/tool/schedule'

import { ref, reactive, watchEffect } from 'vue'
import { useLocale } from 'youibot-plus'
import usePage from '@/hooks/use-page'
import { deleteConfirm } from '@/utils/confirm'
import { list, del, changeStatus, jobRun, add, edit } from '@/utils/api/system/schedule'
import { $msg } from '@/utils/message'
import TableConfig from '@/config/table/system/tool/schedule'
import FormConfig from '@/config/form/system/tool/schedule'
import FilterConfig from '@/config/filter/system/tool/schedule'
const { columns } = TableConfig
const { t } = useLocale()
let isDrawer = ref(false)
const { formData, formListItem } = FormConfig
const state = reactive({
  formData: formData as ITableRow,
  formListItem
})
const { filterConfigList, filterData } = FilterConfig
//列表分页
const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

const handleTableChange = (e: { current: number; pageSize: number }) => {
  pageState.pagination.pageSize = e.pageSize
  pageState.pagination.current = e.current
  getData()
}

/**
 * form是否可见
 *
 * @param {boolean} value 是否显示
 */
function setVisibleFormFn(value: boolean): void {
  isDrawer.value = value
}
/**
 *
 */
function clearFormData() {
  state.formData = formData
}

/**
 *
 */
function handleAdd() {
  clearFormData()
  isDrawer.value = true
}
/**
 * 成功回调
 */
function successAfter() {
  $msg.success({ message: t('system.saveSuccess') })
  setVisibleFormFn(false)
  getData()
}
const addData = () => {
  add(state.formData).then(() => {
    successAfter()
  })
}

const editData = () => {
  edit(state.formData).then(() => {
    successAfter()
  })
}

/**
 * 提交数据
 */
function success(): void {
  if (state.formData.jobId) {
    editData()
  } else {
    addData()
  }
}

/**
 *
 */
function cancel() {
  setVisibleFormFn(false)
}

/**
 * @param {ITableRow} rows 每一行数据
 */
function handleDel(rows: ITableRow): void {
  deleteItemConfirm(rows.jobId, `${t('message.delete')}${rows.jobName}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
}
/**
 * @param {ITableRow} rows 每一行数据
 */
function handleEdit(rows: ITableRow): void {
  state.formData = { ...rows }
  setVisibleFormFn(true)
}

/**
 * @param  {ITableRow} rows 每一行数据
 */
function onceFn(rows: ITableRow): void {
  let data = {
    jobId: rows.jobId
  }

  jobRun(data).then(() => {
    $msg.success({ message: t('system.operationSuccess') })
    getData()
  })
}
/**
 * @param {ITableRow} rows 每一行数据
 */
function handleOnce(rows: ITableRow) {
  deleteConfirm(t('schedule.executePrompt'), t('system.hint'), t('message.ok'), t('message.cancel'), () => {
    onceFn(rows)
  })
}
/**
 * @param  {ITableRow} rows 每一行数据
 */
function changeStatusFn(rows: ITableRow) {
  let data = {
    jobId: rows.jobId,
    status: rows.status
  }

  changeStatus(data).then(() => {
    $msg.success({ message: t('system.operationSuccess') })
    getData()
  })
}
/**
 * @param {ITableRow} rows 每一行数据
 */
function switchClick(rows: ITableRow) {
  let status = 0

  if (rows.status === '1') {
    status = 0
  } else {
    status = 1
  }

  deleteConfirm(t('schedule.statusConfirm.' + status), t('system.hint'), t('message.ok'), t('message.cancel'), () => {
    changeStatusFn(rows)
  })
}

/**
 *阻止点击switch直接切换
 *
 * @returns {boolean} 返回值
 */
function switchChange() {
  return false
}

watchEffect(() => {
  filterConfigList[1].options = [
    { label: t('system.all'), value: '' },
    { label: t('schedule.normal'), value: '0' },
    { label: t('schedule.suspend'), value: '1' }
  ]
})
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  height: 100%;
}
</style>
