<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="tableData" :pagination="pagination" :loading="isLoading">
    <template #options="{ scope }">
      <a-button type="text" class="edit" @click="handleEdit(scope.text)">{{ t('system.edit') }}</a-button>
      <a-button type="text" class="del" @click="handleDel(scope.text)">{{ t('system.del') }}</a-button>
      <a-button type="text" class="dataList" @click="handleDataList(scope.text)">{{ t('IOTParams.dataList') }}</a-button>
    </template>
  </my-table>
  <my-drawer-form
    v-model:formData="formData"
    :visible="isDrawer"
    :title="formData.id ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
  <DataListFrom :init-data="formDataList" :visible="isDrawerDataList" @cancel="cancelDataList" @success="successDataList"></DataListFrom>
  <section class="btn-module">
    <a-button class="add" @click="handleAdd">{{ t('system.add') }}</a-button>
  </section>
</template>

<script lang="ts">
import type { ITableRow } from '@/config/table/business/device-params/iot-params'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { list, del, add, edit } from '@/utils/api/business/iot-params'
import usePage from '@/hooks/use-page'
import DataListFrom from '@/components/business/device-params/iot-params/form-data-list.vue'
import { list as deviceList } from '@/utils/api/business/device-account'
import { protocol } from '@/utils/variable'
import TableConfig from '@/config/table/business/device-params/iot-params'
import FormConfig from '@/config/form/business/device-params/iot-params'
import FilterConfig from '@/config/filter/business/device-params/iot-params'
import { useLocale } from 'youibot-plus'

export default defineComponent({
  name: 'IOTParams',
  components: {
    DataListFrom
  },
  setup() {
    const { formData, formDataList, formListItem } = FormConfig
    const { columns } = TableConfig
    const { filterConfigList, filterData } = FilterConfig
    const { t } = useLocale()
    const state = reactive({
      formData,
      formListItem,
      formDataList
    })
    const { pageState, getData, changeFilter, deleteItemConfirm } = usePage({ getPageFn: list, deleteFn: del })
    const handleDel = (row: ITableRow) => {
      deleteItemConfirm(row.id, `${t('message.delete')}${row.deviceName}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
    }
    let isDrawer = ref(false)
    let isDrawerDataList = ref(false)
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
    const handleDataList = (row: ITableRow) => {
      state.formDataList = {
        ...row,
        list: []
      }
      isDrawerDataList.value = true
    }

    const cancelDataList = () => {
      isDrawerDataList.value = false
    }
    const successDataList = () => {
      isDrawerDataList.value = false
      getData()
    }
    const setProtocolList = () => {
      let list: ISelectOptions[] = []

      protocol.forEach(item => {
        let obj = { label: item, value: item }

        list.push(obj)
      })
      state.formListItem[6].options = list
    }
    const getDeviceList = () => {
      deviceList({ pageSize: 100 }).then(res => {
        let { data } = res

        state.formListItem[0].options = data.rows
      })
      setProtocolList()
    }

    const handleAdd = () => {
      state.formData = formData
      getDeviceList()
      isDrawer.value = true
    }
    const handleEdit = (row: ITableRow) => {
      state.formData = {
        ...row
      }
      getDeviceList()
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
      isDrawerDataList,
      handleDataList,
      cancelDataList,
      successDataList,
      filterConfigList,
      filterData,
      columns,
      t
    }
  }
})
</script>
>
