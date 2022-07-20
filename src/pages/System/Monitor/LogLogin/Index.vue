<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="pageState.tableData" :pagination="pageState.pagination" :loading="pageState.isLoading">
    <template #region="{ scope }">
      {{ scope.text.status == 0 ? t('system.success') : t('system.fail') }}
    </template>
    <template #options="{ scope }">
      <a-button type="text" class="del" @click="handleDel(scope.text)">
        {{ t('system.del') }}
      </a-button>
    </template>
  </my-table>
</template>

<script lang="ts" setup>
import type { ITableRow } from '@/config/table/system/config/user'
import { useLocale } from 'youibot-plus'
import { list, delAll } from '@/utils/api/system/login-log'
import usePage from '@/hooks/use-page'
import TableConfig from '@/config/table/system/monitor/log-login'
import FilterConfig from '@/config/filter/system/monitor/log-login'
import { watchEffect } from 'vue'
const { columns } = TableConfig
const { filterConfigList, filterData } = FilterConfig
const { pageState, deleteItemConfirm, changeFilter } = usePage({ getPageFn: list, deleteFn: delAll })
const { t } = useLocale()

const handleDel = (row: ITableRow) => {
  deleteItemConfirm(row.userId, `${t('message.delete')}${t('loginLog.loginLog')}?`, t('message.Tips'), t('message.ok'), t('message.cancel'))
}

watchEffect(() => {
  filterConfigList[2].options = [{ label: t('system.all'), value: '' }]
  filterConfigList[3].options = [
    { label: t('system.all'), value: '' },
    { label: t('system.success'), value: '1' },
    { label: t('system.fail'), value: '0' }
  ]
})
</script>
