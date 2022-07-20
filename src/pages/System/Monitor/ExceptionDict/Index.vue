<template>
  <my-table :columns="columns" :data="state.tableData" :pagination="false"></my-table>
</template>

<script lang="ts" setup>
import { list } from '@/utils/api/system/exception-dict'
import TableConfig from '@/config/table/system/monitor/exception-dict'
import { onMounted, reactive } from 'vue'
const { columns } = TableConfig
let state = reactive({
  tableData: []
})

//分页
onMounted(() => {
  list().then(res => {
    state.tableData = res.data
  })
})
</script>
