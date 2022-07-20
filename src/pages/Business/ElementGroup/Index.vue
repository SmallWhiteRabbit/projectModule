<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading">
    <template #index="{ scope }">
      {{ scope.index + 1 }}
    </template>
    <template #agvIds="{ scope }">
      <span v-for="item in scope.text.agvs" :key="item.id">
        {{ item.fleetAgvId }}
        <br />
      </span>
    </template>
    <template #deviceIds="{ scope }">
      <span v-for="item in scope.text.devices" :key="item.id">
        {{ item.name }}
        <br />
      </span>
    </template>
    <template #areaUnitIds="{ scope }">
      <span v-for="item in scope.text.areaUnits" :key="item.id">
        {{ item.code }}
        <br />
      </span>
    </template>

    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.id ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @change="changeFormItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/business/element-group'

import { defineComponent, reactive, toRefs, provide } from 'vue'
import { list, del, add, edit } from '@/utils/api/business/element-group'
import { unitList as areaUnitList } from '@/utils/api/business/storage-params'
import { list as deviceList } from '@/utils/api/business/device-account'
import { list as agvList } from '@/utils/api/business/agv-config'
import usePage from '@/hooks/use-page'
import useTree from '@/hooks/use-tree'
import TableConfig from '@/config/table/business/element-group'
import FormConfig from '@/config/form/business/element-group'
import FilterConfig from '@/config/filter/business/element-group'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'ElementGroup',
  setup() {
    //表格数据
    const { formData, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { pageState, changePage, getData, changeFilter, deleteItemConfirm, changePageSize } = usePage({ getPageFn: list, deleteFn: del })
    const { t } = useLocale()
    const state = reactive({
      formData: formData as ITableRow,
      isDrawer: false,
      formListItem
    })

    //删除
    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.id, `${t('message.delete')}${row.name}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }

    //关闭表单
    const cancel = () => {
      state.isDrawer = false
    }
    const successAfter = () => {
      state.isDrawer = false
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

    const changeFormItem = (prop?: string) => {
      if (prop === 'factoryZoneId') {
        state.formData.deviceIds = []
        state.formData.areaUnitIds = []
        state.formData.agvIds = []
      }
    }

    provide('changeFormItem', changeFormItem)
    // 获取agv列表
    const getAgvList = () => {
      agvList({ sinkFactoryZoneId: state.formData.factoryZoneId }).then(res => {
        state.formListItem[5].options = res.data.rows
      })
    }
    // 获取设备列表
    const getDeviceList = () => {
      deviceList({ sinkFactoryZoneId: state.formData.factoryZoneId }).then(res => {
        state.formListItem[2].options = res.data.rows
      })
    }
    // 获取储区列表
    const getAreaUnitList = () => {
      areaUnitList({ sinkFactoryZoneId: state.formData.factoryZoneId }).then(res => {
        state.formListItem[3].options = res.data
      })
    }

    /**
     * 获取树状结构
     */
    async function getTreeData() {
      const { getFactoryTreeList } = useTree()

      state.formListItem[1].treeList = await getFactoryTreeList()
      getAgvList()
      getDeviceList()
      getAreaUnitList()
    }
    const handleAdd = () => {
      state.formData = formData
      getTreeData()
      state.isDrawer = true
    }

    //编辑
    const handleEdit = (row: ITableRow) => {
      let { devices, areaUnits, agvs } = row

      state.formData = { ...row }
      state.formData.deviceIds = devices?.map(item => item.id) || []
      state.formData.agvIds = agvs?.map(item => item.id) || []
      state.formData.areaUnitIds = areaUnits?.map(item => item.id) || []
      getTreeData()
      state.isDrawer = true
    }

    return {
      ...toRefs(state),
      ...toRefs(pageState),
      changePageSize,
      filterConfigList,
      handleAdd,
      changeFilter,
      handleEdit,
      cancel,
      handleDel,
      changePage,
      success,
      columns,
      changeFormItem,
      filterData,
      t
    }
  }
})
</script>
