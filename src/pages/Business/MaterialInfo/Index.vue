<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>

  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading">
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
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
    <ImportExport :template-url="materialInfoTemplate" @fileUpload="handleImport"></ImportExport>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/business/material-info'
import TableConfig from '@/config/table/business/material-info'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import ImportExport from '@/components/common/import-export.vue'
import { list, del, materialInfoTemplate, importData, add, edit } from '@/utils/api/business/material-info'
import { create_link } from '@/utils/download'
import usePage from '@/hooks/use-page'
import FormConfig from '@/config/form/business/material-info'
import FilterConfig from '@/config/filter/business/material-info'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'MaterialInfo',
  components: {
    ImportExport
  },
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
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.id, `${t('message.delete')}${row.name}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }

    const handleAdd = () => {
      state.formData = formData

      isDrawer.value = true
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

    const handleImport = (file: File) => {
      let formData = new FormData()

      formData.append('file', file)
      importData(formData).then(() => {
        getData()
      })
    }
    const handleDownload = () => {
      create_link(materialInfoTemplate)
    }
    const handleExport = () => {}
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
      handleDownload,
      handleExport,
      handleImport,
      materialInfoTemplate,
      columns,
      filterConfigList,
      filterData,
      t
    }
  }
})
</script>
>
