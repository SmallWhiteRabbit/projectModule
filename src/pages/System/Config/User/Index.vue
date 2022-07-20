<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading" @change="handleTableChange">
    <template #postNames="{ scope }">
      <span v-for="item in scope.text.postNames" :key="item">{{ item }}、</span>
    </template>
    <template #status="{ scope }">
      <span v-if="scope.text.status == 0">{{ t('message.normal') }}</span>
      <span v-if="scope.text.status == 1">{{ t('message.stop') }}</span>
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
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.userId ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/system/config/user'

import { defineComponent, reactive, ref, toRefs } from 'vue'
import { list, del, add, edit } from '@/utils/api/system/user'
import usePage from '@/hooks/use-page'
import TableConfig from '@/config/table/system/config/user'
import FormConfig from '@/config/form/system/config/user'
import FilterConfig from '@/config/filter/system/config/user'
import useTree from '@/hooks/use-tree'
import { list as roleList } from '@/utils/api/system/role'
import { list as postList } from '@/utils/api/system/station'
import { useLocale } from 'youibot-plus'
import { get_email_check, get_phone_check } from '@/utils/Form'

export default defineComponent({
  name: 'SystemConfigUser',
  setup() {
    const { columns } = TableConfig
    const { formData, formListItem } = FormConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()

    const state = reactive({
      formData: formData as ITableRow,
      formListItem
    })
    let isDrawer = ref(false)
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.userId, `${t('message.delete')}${row.userName}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }

    const cancel = () => {
      isDrawer.value = false
    }

    // 新增
    const addData = () => {
      add(state.formData).then(() => {
        isDrawer.value = false
        getData()
      })
    }
    // 编辑
    const editData = () => {
      edit(state.formData).then(() => {
        isDrawer.value = false
        getData()
      })
    }

    const success = () => {
      if (state.formData.userId) {
        editData()
      } else {
        addData()
      }
    }

    const handleTableChange = (e: { current: number; pageSize: number }) => {
      pageState.pagination.pageSize = e.pageSize
      pageState.pagination.current = e.current
      getData()
    }
    // 归属机构

    /**
     *
     */
    async function getTreeData() {
      const { getMechanismTreeList } = useTree()

      if (state.formListItem[2].treeList) {
        state.formListItem[2].treeList = await getMechanismTreeList(false)
      }
    }
    // 角色列表
    /**
     *
     */
    function getRoleList() {
      roleList({ pageSize: 100 }).then(res => {
        state.formListItem[6].options = res.data.rows
      })
    }
    // 岗位列表
    /**
     *
     */
    function getPostList() {
      postList({ pageSize: 100 }).then(res => {
        state.formListItem[3].options = res.data.rows
      })
    }
    /**
     *添加、编辑默认获取数据
     */
    function isDrawerShow() {
      isDrawer.value = true
      getTreeData()
      getRoleList()
      getPostList()
    }

    const handleAdd = () => {
      state.formData = formData

      isDrawerShow()
    }
    const handleEdit = (row: ITableRow) => {
      state.formData = {
        ...row
      }
      isDrawerShow()
    }

    state.formListItem[4].rules = [get_email_check(t('message.placeholder'), t('message.emailFormatErr'))]
    state.formListItem[5].rules = [get_phone_check(t('message.placeholder'), t('message.phoneFormatErr'))]

    return {
      handleEdit,
      handleDel,
      ...toRefs(state),
      isDrawer,
      cancel,
      success,
      ...toRefs(pageState),
      changeFilter,
      handleAdd,
      filterConfigList,
      columns,
      handleTableChange,
      filterData,
      t,
      state
    }
  }
})
</script>
