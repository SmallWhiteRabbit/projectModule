<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="getTableList"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="false" :loading="isLoading" :row-key="handleRow">
    <template #menuName="{ scope }">
      {{ t(scope.text.menuName) }}
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
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.deptId ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/system/config/mechanism'
import TableConfig from '@/config/table/system/config/mechanism'
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { tree, del, add, edit } from '@/utils/api/system/mechanism'
import { deleteConfirm } from '@/utils/confirm'
import { $msg } from '@/utils/message'
import useTree from '@/hooks/use-tree'
import FormConfig from '@/config/form/system/config/mechanism'
import FilterConfig from '@/config/filter/system/config/mechanism'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'Mechanism',
  setup() {
    const { formData, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()
    const state = reactive({
      formData: formData as ITableRow,
      isLoading: false,
      formListItem
    })

    let isDrawer = ref(false)

    const handleAdd = () => {
      state.formData = formData
      isDrawer.value = true
    }

    let tableData = ref<ITableRow[]>([])

    const menuFilter = (list: ITree[]) => {
      list.forEach((item: ITree) => {
        if (item.children && item.children.length > 0) {
          menuFilter(item.children)
        } else {
          item.children = undefined
        }
      })
    }

    const getTableList = (data?: ITableRow) => {
      state.isLoading = true

      tree(data)
        .then(res => {
          let { data } = res

          menuFilter(data)
          tableData.value = data
        })
        .finally(() => {
          state.isLoading = false
        })
    }

    const handleDel = (row: { deptId: string; deptName: string }) => {
      deleteConfirm(`${t('message.delete')}${row.deptName}`, t('message.Tips'), t('message.ok'), t('message.cancel'), () => {
        del(row.deptId).then(() => {
          $msg.success({ message: t('system.success') })
          getTableList()
        })
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
      if (state.formData.deptId) {
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

    /**
     *
     */
    async function getTreeData() {
      const { getMechanismTreeList } = useTree()

      state.formListItem[0].treeList = await getMechanismTreeList()
    }

    const handleRow = (record: { deptId: string }) => {
      return record.deptId
    }

    watchEffect(() => {
      if (isDrawer.value) {
        getTreeData()
      }
    })

    return {
      handleAdd,
      tableData,
      handleEdit,
      handleDel,
      ...toRefs(state),
      isDrawer,
      cancel,
      success,
      columns,
      getTableList,
      filterConfigList,
      filterData,
      t,
      handleRow
    }
  }
})
</script>
