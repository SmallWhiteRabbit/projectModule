<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading" :options-list="optionsList"></my-table>
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.id ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
    <ImportExport :template-url="vehicleInfoTemplate" @fileUpload="handleImport"></ImportExport>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/business/vehicle-info'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { list, del, vehicleInfoTemplate, importData, add, edit } from '@/utils/api/business/vehicle-info'
import ImportExport from '@/components/common/import-export.vue'
import { create_link } from '@/utils/download'
import usePage from '@/hooks/use-page'
import TableConfig from '@/config/table/business/vehicle-info'
import FormConfig from '@/config/form/business/vehicle-info'
import FilterConfig from '@/config/filter/business/vehicle-info'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'VehicleInfo',
  components: {
    ImportExport
  },
  setup() {
    const { formData, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })

    const state = reactive({
      formData: formData as ITableRow,
      formListItem
    })
    let isDrawer = ref(false)

    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.id, `${t('message.delete')}${row.type}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
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
    const handleDownload = () => {
      create_link(vehicleInfoTemplate)
    }
    const handleImport = (file: File) => {
      let formData = new FormData()

      formData.append('file', file)
      importData(formData).then(() => {
        getData()
      })
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
    const optionsList = [
      {
        label: 'system.edit',
        clickFunc: handleEdit
      },
      {
        label: 'system.del',
        clickFunc: handleDel
      }
    ]

    return {
      columns,
      vehicleInfoTemplate,
      handleEdit,
      handleDel,
      ...toRefs(state),
      ...toRefs(pageState),
      isDrawer,
      cancel,
      success,
      getData,
      changeFilter,
      handleAdd,
      handleDownload,
      handleImport,
      optionsList,
      filterConfigList,
      filterData,
      t
    }
  }
})
</script>
>
