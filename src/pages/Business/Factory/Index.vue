<template>
  <my-table :columns="columns" :data="tableData" :pagination="false" :loading="state.loading" :row-key="handleRow">
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handle_del(scope.text)">{{ t('system.del') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="state.formData"
    :visible="isDrawer"
    :title="state.formData.id ? t('system.edit') : t('system.add')"
    :form-list="state.formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts" setup>
import type { ITableRow } from '@/config/table/business/factory'
import { reactive, ref, watchEffect } from 'vue'
import { tree, del, add, edit } from '@/utils/api/business/factory'
import { deleteConfirm } from '@/utils/confirm'
import { $msg } from '@/utils/message'
import { fleetAGVMaps } from '@/utils/api/fleet'
import useTree from '@/hooks/use-tree'
import TableConfig from '@/config/table/business/factory'
import FormConfig from '@/config/form/business/factory'
import { useLocale } from 'youibot-plus'
const { formData, formListItem } = FormConfig
const { columns } = TableConfig
const { t } = useLocale()

const state = reactive({
  formData,
  loading: false,
  formListItem
})
let isDrawer = ref(false)

let tableData = ref<ITableRow[]>([])

// 获取列表数据
const getTableList = (searchdata?: ITableRow) => {
  state.loading = true
  tree(searchdata)
    .then(res => {
      let { data } = res

      if (data && data.length > 0) {
        tableData.value = data
      } else {
        tableData.value = []
      }
    })
    .finally(() => {
      state.loading = false
    })
}

getTableList()
const cancel = () => {
  isDrawer.value = false
}
const successAfter = () => {
  isDrawer.value = false
  getTableList()
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

const getAVGMapList = () => {
  fleetAGVMaps().then(res => {
    let { data } = res

    state.formListItem[3].options = data
  })
}

/**
 * 获取树状结构
 */
async function getTreeData() {
  const { getFactoryTreeList } = useTree()

  state.formListItem[0].treeList = await getFactoryTreeList(true)
}
const changeFleetMap = (id: string) => {
  let options = state.formListItem[3].options

  if (options) {
    options.forEach((item: IFleetAGV) => {
      if (item.id === id) {
        state.formData.fleetMapName = item.name
      }
    })
  }
}

const success = () => {
  changeFleetMap(state.formData.fleetMapId)
  if (state.formData.id) {
    editData()
  } else {
    addData()
  }
}
const handleAdd = () => {
  state.formData = {
    name: '',
    level: 1,
    parentId: '',
    id: '',
    parentName: 'menu.business.main',
    fleetMapId: '',
    fleetMapName: ''
  }
  isDrawer.value = true
}
const handleEdit = (row: ITableRow) => {
  state.formData = {
    ...row
  }
  state.formData.children = undefined
  isDrawer.value = true
}

watchEffect(() => {
  if (isDrawer.value) {
    getAVGMapList()
    getTreeData()
  }
})
const handleRow = (record: { id: string }) => record.id

/**
 * 删除
 *
 * @param {ITableRow} row 每一项table
 */
function handle_del(row: ITableRow) {
  deleteConfirm(`${t('message.delete')}${row.name}`, t('message.Tips'), t('message.ok'), t('message.cancel'), () => {
    del(row.id).then(() => {
      $msg.success({ message: t('system.success') })
      getTableList()
    })
  })
}
</script>

<style></style>
