<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="pageState.tableData" :pagination="false" :loading="pageState.isLoading" :options-list="optionsList">
    <template #index="{ scope }">
      {{ scope.index + 1 }}
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="state.formData"
    :visible="state.visible"
    :title="t('system.edit')"
    :form-list="state.formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button type="primary" @click="synchroFleet">{{ t('AgvConfig.Fleet') }}</a-button>
  </section>
</template>

<script lang="ts" setup>
import type { ITableRow } from '@/config/table/business/agv-config'
import type { TFilterData } from '@/config/filter/business/agv-config'
import { reactive } from 'vue'
import { list, del, edit, listFleet } from '@/utils/api/business/agv-config'
import { $msg } from '@/utils/message'
import usePage from '@/hooks/use-page'
import FilterConfig from '@/config/filter/business/agv-config'
import useTree from '@/hooks/use-tree'
import TableConfig from '@/config/table/business/agv-config'
import FormConfig from '@/config/form/business/agv-config'
import { useLocale } from 'youibot-plus'
const { t } = useLocale()
const { formListItem, formData } = FormConfig
const { filterConfigList, filterData } = FilterConfig
const { columns } = TableConfig

const { pageState, getData, changeFilter } = usePage<ITableRow, TFilterData>({ getPageFn: list, deleteFn: del })

const state = reactive({
  formListItem,
  formData: formData as ITableRow,
  visible: false,
  edutId: '',
  filterConfigList
})

const { getFactoryTreeList } = useTree()

/**
 *
 */
async function getTreeData() {
  state.formListItem[2].treeList = await getFactoryTreeList()
}

/**
 * 编辑
 *
 * @param {ITableRow} row 每一项
 */
function handleEdit(row: ITableRow) {
  getTreeData()
  state.formData = { ...row }
  state.visible = true
}

let optionsList = [
  {
    label: 'system.edit',
    clickFunc: handleEdit
  }
]

/**
 *表单提交
 */
function success() {
  edit(state.formData).then(() => {
    state.visible = false
    getData()
  })
}
/**
 *关闭表单
 */
function cancel() {
  state.visible = false
}
//同步fleet

/**
 *
 */
function synchroFleet() {
  listFleet().then(() => {
    $msg.success({ message: t('AgvConfig.synchroFinish') })
    getData()
  })
}
</script>
