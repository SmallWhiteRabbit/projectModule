<template>
  <my-filter :filter-config-list="filterConfigList" :filter-data="filterData" @change="changeFilter"></my-filter>
  <my-table :columns="columns" :data="pageState.tableData" :pagination="pageState.pagination" :loading="pageState.isLoading">
    <template #operateType="{ scope }">
      {{
        scope.text.operatorType == 2 ? t('operateLog.mobile') : scope.text.operatorType == 1 ? t('operateLog.pc') : t('operateLog.other')
      }}
    </template>
    <template #status="{ scope }">
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
import { list, del } from '@/utils/api/system/operate-log'
import usePage from '@/hooks/use-page'
import TableConfig from '@/config/table/system/monitor/log-operate'
import FilterConfig from '@/config/filter/system/monitor/log-operate'
import { watchEffect } from 'vue'
const { columns } = TableConfig
const { filterConfigList, filterData } = FilterConfig
const { pageState, deleteItemConfirm, changeFilter } = usePage({ getPageFn: list, deleteFn: del })
const { t } = useLocale()

const handleDel = (row: ITableRow) => {
  deleteItemConfirm(
    row.userId,
    `${t('message.delete')}${t('operateLog.operateLog')}?`,
    t('message.Tips'),
    t('message.ok'),
    t('message.cancel')
  )
}

watchEffect(() => {
  filterConfigList[2].options = [
    { label: t('operateLog.pc'), value: '1' },
    { label: t('operateLog.mobile'), value: '2' },
    { label: t('operateLog.other'), value: '0' }
  ]
  filterConfigList[3].options = [
    { label: t('operateLog.normal'), value: '1' },
    { label: t('operateLog.unnormal'), value: '0' }
  ]
})
</script>
