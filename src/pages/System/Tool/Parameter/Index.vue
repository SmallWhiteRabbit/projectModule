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
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="state.formData"
    :visible="isDrawer"
    :title="state.formData.configId ? t('system.edit') : t('system.add')"
    :form-list="state.formListItem"
    @cancel="cancel"
    @success="success">
    <template #configKey>
      <a-input v-model:value="formData.configKey" :placeholder="t('message.placeholder')" />
      <div class="note">{{ t('systemTool.parameter.warning') }} ${config.getKey("SYS_KEY")}</div>
    </template>
  </my-drawer-form>
</template>

<script lang="ts" setup>
import type { ITableRow } from '@/config/table/system/tool/parameter'
import { ref, reactive } from 'vue'
import usePage from '@/hooks/use-page'
import { list, del, add, edit } from '@/utils/api/system/parameter'
import { $msg } from '@/utils/message'
import { useLocale } from 'youibot-plus'
import TableConfig from '@/config/table/system/tool/parameter'
import FormConfig from '@/config/form/system/tool/parameter'
import FilterConfig from '@/config/filter/system/tool/parameter'
const { columns } = TableConfig
const { t } = useLocale()
let isDrawer = ref(false)
const { formData, formListItem } = FormConfig
const { filterConfigList, filterData } = FilterConfig
const state = reactive({
  formData: formData as ITableRow,
  formListItem
})
//列表分页
const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

/**
 * 成功后执行
 */
function successAfter() {
  $msg.success({ message: t('system.saveSuccess') })
  isDrawer.value = false
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
 * 取消按钮回调
 */
function cancel() {
  isDrawer.value = false
}

/**
 * @param {ITableRow} rows 每一行数据
 */
function handleDel(rows: ITableRow): void {
  deleteItemConfirm(rows.configId, `${t('message.delete')}${rows.configName}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
}
/**
 * @param {ITableRow} rows 每一行数据
 */
function handleEdit(rows: ITableRow): void {
  state.formData.configId = rows.configId
  state.formData.configName = rows.configName
  state.formData.configKey = rows.configKey
  state.formData.configType = rows.configType
  state.formData.configValue = rows.configValue
  state.formData.remark = rows.remark
  isDrawer.value = true
}

const handleTableChange = (e: { current: number; pageSize: number }) => {
  pageState.pagination.pageSize = e.pageSize
  pageState.pagination.current = e.current
  getData()
}

/**
 * 提交
 */
function success(): void {
  getData()
  if (state.formData.configId) {
    editData()
  } else {
    addData()
  }
}
</script>
<style lang="less" scoped>
.note {
  color: red;
  font-size: 12px;
  line-height: 20px;
}
</style>
