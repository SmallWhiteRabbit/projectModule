<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading">
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
      <a-button type="text" class="wayPoint" @click="handleWayPoint(scope.text)">{{ t('deviceAccount.wayPoint') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.id ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <DataWayPoint :init-data="formWayPoint" :visible="isDrawerWayPoint" @cancel="cancelWayPoint" @success="successWayPoint"></DataWayPoint>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
    <ImportExport :template-url="templateUrl" @fileUpload="handleImport"></ImportExport>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/business/device-params/device-account'

import { defineComponent, reactive, ref, toRefs } from 'vue'
import { list, del, templateUrl, importData, add, edit } from '@/utils/api/business/device-account'
import usePage from '@/hooks/use-page'
import ImportExport from '@/components/common/import-export.vue'
import DataWayPoint from '@/components/business/device-params/device-account/form-way-point.vue'
import useTree from '@/hooks/use-tree'
import TableConfig from '@/config/table/business/device-params/device-account'
import FormConfig from '@/config/form/business/device-params/device-account'
import FilterConfig from '@/config/filter/business/device-params/device-account'
import { useLocale } from 'youibot-plus'

export default defineComponent({
  name: 'DeviceAccount',
  components: {
    ImportExport,
    DataWayPoint
  },
  setup() {
    const { formData, formWayPoint, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()
    const state = reactive({
      formData,
      formWayPoint,
      formListItem
    })
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

    let isDrawer = ref(false)
    let isDrawerWayPoint = ref(false)

    const cancel = () => {
      isDrawer.value = false
    }

    const successAfter = () => {
      isDrawer.value = false
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
    const success = () => {
      if (state.formData.id) {
        editData()
      } else {
        addData()
      }
    }

    /**
     *
     */
    async function getTreeData() {
      const { getFactoryTreeList } = useTree()

      if (state.formListItem[2] && state.formListItem[2].treeList) {
        state.formListItem[2].treeList = await getFactoryTreeList()
      }
    }
    const handleEdit = (row: ITableRow) => {
      state.formData = {
        ...row
      }
      getTreeData()
      isDrawer.value = true
    }

    const handleImport = (file: File) => {
      let formData = new FormData()

      formData.append('file', file)
      importData(formData).then(() => {
        getData()
      })
    }

    const handleWayPoint = (row: ITableRow) => {
      state.formWayPoint = {
        ...row,
        list: []
      }
      isDrawerWayPoint.value = true
    }
    const cancelWayPoint = () => {
      isDrawerWayPoint.value = false
    }
    const successWayPoint = () => {
      isDrawerWayPoint.value = false
    }

    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.id, `${t('message.delete')}${row.name}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }
    const handleAdd = () => {
      state.formData = formData
      getTreeData()
      isDrawer.value = true
    }

    return {
      handleEdit,
      handleDel,
      ...toRefs(state),
      isDrawer,
      cancel,
      success,
      ...toRefs(pageState),
      getData,
      changeFilter,
      handleAdd,
      handleImport,
      templateUrl,
      isDrawerWayPoint,
      handleWayPoint,
      cancelWayPoint,
      successWayPoint,
      filterConfigList,
      filterData,
      columns,
      t
    }
  }
})
</script>
>
