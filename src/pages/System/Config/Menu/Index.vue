<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="getTableList"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="false" :has-btn="false" :loading="isLoading" :row-key="handleRow">
    <template #menuName="{ scope }">
      {{ t(scope.text.menuName) }}
    </template>
    <template #menuType="{ scope }">
      <span v-if="scope.text.menuType == 1">{{ t('menuManage.menu') }}</span>
      <span v-else>{{ t('menuManage.btn') }}</span>
    </template>
    <template #parentName="{ scope }">
      <span v-if="scope.text.parentName">{{ t(scope.text.parentName) }}</span>
    </template>
    <template #visible="{ scope }">
      <span v-if="scope.text.visible == 0">{{ t('system.show') }}</span>
      <span v-else>{{ t('system.hide') }}</span>
    </template>
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.menuId ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
</template>

<script lang="ts">
import type { ITableRow, ITreeMenu } from '@/config/table/system/config/menu'
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { tree, add, edit, treeselect as menuTree } from '@/utils/api/system/menu'
import TableConfig from '@/config/table/system/config/menu'
import FormConfig from '@/config/form/system/config/menu'
import FilterConfig from '@/config/filter/system/config/menu'
import { useLocale } from 'youibot-plus'

export default defineComponent({
  name: 'MenuManage',
  setup() {
    const { formData, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()

    const state = reactive({
      formData: formData as ITableRow,
      formListItem
    })
    let isDrawer = ref(false)
    let isLoading = ref(false)
    let tableData = ref<ITableRow[]>([])
    const menuFilter = (list: ITableRow[]) => {
      list.forEach((item: ITableRow) => {
        if (item.children && item.children.length > 0) {
          menuFilter(item.children)
        } else {
          item.children = undefined
        }
      })
    }
    const getTableList = (searchdata?: ITableRow) => {
      isLoading.value = true
      tree(searchdata)
        .then(res => {
          let { data } = res

          if (data && data.length > 0) {
            menuFilter(data)
            tableData.value = data[0].children
          } else {
            tableData.value = []
          }
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    const cancel = () => {
      isDrawer.value = false
    }

    const addData = () => {
      add(state.formData).then(() => {
        isDrawer.value = false
        getTableList()
      })
    }
    const editData = () => {
      edit(state.formData).then(() => {
        isDrawer.value = false
        getTableList()
      })
    }
    const success = () => {
      if (state.formData.menuId) {
        editData()
      } else {
        addData()
      }
    }
    const handleEdit = (row: ITableRow) => {
      state.formData = {
        ...row
      }
      state.formData.children = undefined
      isDrawer.value = true
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
     * 获取数据
     */
    async function getTreeData() {
      menuTree({}).then(res => {
        const { data } = res

        state.formListItem[0].treeList = treeMenuFilter(data)
      })
    }

    const handleRow = (record: { menuId: string }) => record.menuId

    watchEffect(() => {
      if (isDrawer.value) {
        getTreeData()
      }
      filterConfigList[0].options = [
        { label: t('menuManage.menu'), value: '1' },
        { label: t('menuManage.btn'), value: '0' }
      ]
    })

    return {
      tableData,
      handleEdit,
      ...toRefs(state),
      isDrawer,
      cancel,
      success,
      getTableList,
      filterConfigList,
      filterData,
      columns,
      isLoading,
      t,
      handleRow
    }
  }
})
</script>
