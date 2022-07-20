<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table
    :columns="columns"
    :data="pageState.tableData"
    :loading="pageState.isLoading"
    :pagination="pageState.pagination"
    @change="handleTableChange">
    <template #status="{ scope }">
      <div>{{ t('dictManage.status.' + scope.text.status) }}</div>
    </template>
    <template #isDefault="{ scope }">
      <div>{{ t('dictManage.' + scope.text.isDefault) }}</div>
    </template>
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
    </template>
  </my-table>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
  <my-drawer-form
    v-model:formData="state.formData"
    :visible="isDrawer"
    :title="state.formData.dictCode ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success">
    <template #dictType>
      <a-input v-model:value="formData.dictType" :placeholder="t('message.placeholder')" />
      <div class="note">{{ t('dictManage.warning') }}dict.getType('sys_yes_no')</div>
    </template>
  </my-drawer-form>
</template>

<script lang="ts" setup>
import type { ITableRow } from '@/config/table/system/tool/dict'
import { ref, reactive, watchEffect } from 'vue'
import { useLocale } from 'youibot-plus'
import usePage from '@/hooks/use-page'
import { list, del, add, edit } from '@/utils/api/system/dict'
import TableConfig from '@/config/table/system/tool/dict'
import FormConfig from '@/config/form/system/tool/dict'
import FilterConfig from '@/config/filter/system/tool/dict'
const { columns } = TableConfig
const { t } = useLocale()
let isDrawer = ref(false)
const { formData, formListItem } = FormConfig
const { filterConfigList, filterData } = FilterConfig
const state = reactive({
  formData
})
//列表分页
const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

/**
 * 删除按钮
 *
 * @param {ITableRow} rows 每一行数据
 */
function handleDel(rows: ITableRow): void {
  deleteItemConfirm(rows.dictCode, `${t('message.delete')}${rows.dictLabel}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
}
/**
 * @param {ITableRow} rows 每一行数据
 */
function handleEdit(rows: ITableRow): void {
  state.formData = {
    ...rows
  }
  isDrawer.value = true
}
/**
 * 重置数据
 */
function clearFormData() {
  state.formData = formData
}

/**
 * 新增按钮
 */
function handleAdd() {
  clearFormData()
  isDrawer.value = true
}

const cancel = () => {
  isDrawer.value = false
}

const addData = () => {
  add(state.formData).then(() => {
    isDrawer.value = false
    getData()
  })
}
const editData = () => {
  edit(state.formData).then(() => {
    isDrawer.value = false
    getData()
  })
}

const handleTableChange = (e: { current: number; pageSize: number }) => {
  pageState.pagination.pageSize = e.pageSize
  pageState.pagination.current = e.current
  getData()
}

/**
 * 提交按钮
 */
function success() {
  if (state.formData.dictCode) {
    editData()
  } else {
    addData()
  }
}
watchEffect(() => {
  filterConfigList[2].options = [
    { label: t('system.all'), value: '' },
    { label: t('dictManage.status.0'), value: '0' },
    { label: t('dictManage.status.1'), value: '1' }
  ]
})
</script>
<style lang="less" scoped>
.note {
  color: red;
  font-size: 12px;
  line-height: 20px;
}
</style>
