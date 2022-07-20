<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :loading="isLoading" :pagination="pagination" @change="handleTableChange">
    <template #status="{ scope }">
      <span v-if="scope.text.status == 0">{{ t('message.normal') }}</span>
      <span v-if="scope.text.status == 1">{{ t('message.stop') }}</span>
    </template>
    <template #isDefault="{ scope }">
      <div>{{ t('dictManage.' + scope.text.isDefault) }}</div>
    </template>
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handle_edit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handle_del(scope.text)">{{ t('system.del') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.postId ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success" />
  <section class="btn-module">
    <a-button class="add" @click="handle_add">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts">
import type { ITableRow, ITypeName } from '@/config/table/system/config/station'
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { list, del, listClass, addClass, add, edit } from '@/utils/api/system/station'
import usePage from '@/hooks/use-page'
import TableConfig from '@/config/table/system/config/station'

import FormConfig from '@/config/form/system/config/station'
import FilterConfig from '@/config/filter/system/config/station'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'Station',
  setup() {
    const { formData, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({
      getPageFn: list,
      deleteFn: del
    })

    const state = reactive({
      formData: formData as ITableRow,
      formListItem,
      typeNameList: [] as ITypeName[],
      newTypeName: ''
    })

    let isDrawer = ref(false)

    /**
     * @param {ITableRow} row table每一项
     */
    function handle_del(row: ITableRow) {
      deleteItemConfirm(row.postId, `${t('message.delete')}${row.postName}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }

    /**
     *
     */
    function cancel() {
      isDrawer.value = false
    }
    /**
     * 获取岗位类型列表
     */
    function get_station_type_list() {
      listClass().then(res => {
        let { data } = res
        let typeNameList = state.formListItem[2].options

        if (typeNameList) {
          state.formListItem[2].options = data
        }
      })
    }
    /**
     * 新增岗位类型
     *
     * @param {string} val 标签名
     */
    function add_types_list(val: string) {
      let data = {
        typeName: val,
        status: ''
      }

      addClass(data).then(() => {
        get_station_type_list()
      })
    }
    /**
     * @param {ITableRow} row 每一项
     */
    function handle_edit(row: ITableRow) {
      state.formData = {
        ...row
      }
      get_station_type_list()
      state.formListItem[2].funcAdd = add_types_list
      isDrawer.value = true
    }

    const handleTableChange = (e: { current: number; pageSize: number }) => {
      pageState.pagination.pageSize = e.pageSize
      pageState.pagination.current = e.current
      getData()
    }

    /**
     *根据typeName匹配typeId
     */
    function get_type_id() {
      let typeNameList = state.formListItem[2].options

      if (typeNameList) {
        typeNameList.forEach(item => {
          if (item.typeId === state.formData.typeId) {
            state.formData.typeName = item.typeName
          }
        })
      }
    }

    /**
     * 成功回调
     */
    function success_after() {
      isDrawer.value = false
      getData()
    }
    /**
     * 新增
     */
    function add_data() {
      add(state.formData).then(() => {
        success_after()
      })
    }
    /**
     * 编辑
     */
    function edit_data() {
      edit(state.formData).then(() => {
        success_after()
      })
    }

    /**
     * 新增按钮
     */
    function handle_add() {
      state.formData = formData
      get_station_type_list()
      state.formListItem[2].funcAdd = add_types_list
      isDrawer.value = true
    }
    /**
     * 提交
     */
    function success() {
      get_type_id()
      if (state.formData.postId) {
        edit_data()
      } else {
        add_data()
      }
    }
    watchEffect(() => {
      filterConfigList[2].options = [
        { label: t('message.normal'), value: '1' },
        { label: t('message.stop'), value: '0' }
      ]
    })
    return {
      handle_edit,
      handle_del,
      ...toRefs(state),
      ...toRefs(pageState),
      isDrawer,
      cancel,
      success,
      getData,
      changeFilter,
      handle_add,
      columns,
      handleTableChange,
      add_types_list,
      filterConfigList,
      filterData,
      t
    }
  }
})
</script>
>
