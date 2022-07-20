<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading">
    <template #menuNames="{ scope }">
      <span v-for="item in scope.text.menuNames" :key="item">{{ t(item) }}、</span>
    </template>
    <template #deptNames="{ scope }">
      <span v-for="item in scope.text.deptNames" :key="item">{{ item }}、</span>
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
    :title="formData.roleId ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/system/config/role'
import type { ITreeMenu } from '@/config/table/system/config/menu'
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { list, del, add, edit } from '@/utils/api/system/role'
import usePage from '@/hooks/use-page'
import TableConfig from '@/config/table/system/config/role'

import useTree from '@/hooks/use-tree'
import FormConfig from '@/config/form/system/config/role'
import FilterConfig from '@/config/filter/system/config/role'
import { useLocale } from 'youibot-plus'
import { treeselect as menuTree } from '@/utils/api/system/menu'
export default defineComponent({
  name: 'Role',
  setup() {
    const { formData, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()
    const state = reactive({
      formData: formData as ITableRow,
      formListItem
    })
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })
    const { getMechanismTreeList } = useTree()
    let isDrawer = ref(false)

    const handleAdd = () => {
      state.formData = formData
      isDrawer.value = true
    }

    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.roleId, `${t('message.delete')}${row.roleName}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }

    const cancel = () => {
      isDrawer.value = false
    }

    const handleEdit = (row: ITableRow) => {
      state.formData = {
        ...row
      }
      isDrawer.value = true
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

    const success = () => {
      if (state.formData.roleId) {
        editData()
      } else {
        addData()
      }
    }

    const treeMenuFilter = (tree: ITreeMenu[]): ITreeMenu[] => {
      const newTree: ITreeMenu[] = tree.filter((item: ITreeMenu) => {
        item.label = t(item.label)
        return item.menuType !== '1'
      })

      return newTree.map(item => {
        if (item.children) {
          item.children = treeMenuFilter(item.children)
        }
        return item
      })
    }

    /**
     *
     */
    async function getTreeData() {
      state.formListItem[2].treeList = await getMechanismTreeList()
      menuTree({}).then(res => {
        const { data } = res

        state.formListItem[1].treeList = treeMenuFilter(data)
      })
    }
    watchEffect(() => {
      if (isDrawer.value) {
        getTreeData()
      }
    })

    return {
      handleAdd,
      handleEdit,
      handleDel,
      ...toRefs(state),
      ...toRefs(pageState),
      isDrawer,
      cancel,
      success,
      getData,
      changeFilter,
      columns,
      filterConfigList,
      filterData,
      t
    }
  }
})
</script>
