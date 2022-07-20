<template>
  <my-modal width="70%" :visible="visible" :title="t('storageParams.cellEdit')" :has-footer="true">
    <template #content>
      <my-table :columns="columns" :data="formData" bordered :pagination="false">
        <template #actionCode="{ scope: { index } }">
          <a-input v-model:value="formData[index]['actionCode']" />
        </template>
        <template #deviceIotSignalId="{ scope: { index } }">
          <a-input v-model:value="formData[index]['deviceIotSignalId']" />
        </template>
        <template #remark="{ scope: { index } }">
          <a-input v-model:value="formData[index]['remark']" />
        </template>

        <template #markerCode="{ scope: { index } }">
          <a-select
            v-model:value="formData[index]['markerCode']"
            :options="fleetMarkersList"
            :field-names="{ label: 'code', value: 'agvMapId', options: 'options' }" />
        </template>
        <template #attribute="{ scope: { index } }">
          <a-select v-model:value="formData[index]['attribute']">
            <a-select-option v-for="item in CellAttr" :key="item" :label="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </template>
        <template #status="{ scope: { index } }">
          <a-select v-model:value="formData[index]['status']">
            <a-select-option v-for="item in CellStatus" :key="item" :label="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </template>
      </my-table>
    </template>
    <template #footer>
      <a-button @click="handleClose">{{ t('message.cancel') }}</a-button>
      <a-button type="primary" @click="handeleSuccess">{{ t('message.submit') }}</a-button>
    </template>
  </my-modal>
</template>

<script lang="ts">
import type { ITableRow as ITableCellRow } from '@/config/table/business/storage-params/table-cell'
import type { PropType } from 'vue'
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { CellAttr, CellStatus } from '@/utils/variable'
import { fleetMarkers } from '@/utils/api/fleet'
import { useLocale, deepClone } from 'youibot-plus'
import TableConfig from '@/config/table/business/storage-params/table-cell'
export default defineComponent({
  name: 'TableCell',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    initData: {
      type: Array as PropType<ITableCellRow[]>,
      required: true,
      default() {
        return []
      }
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { columns } = TableConfig
    const state = reactive({
      formData: [] as ITableCellRow[],
      fleetMarkersList: [] as IFleetMaker[]
    })

    const getFleetMarkers = () => {
      fleetMarkers().then(res => {
        state.fleetMarkersList = res.data
      })
    }
    const handleClose = () => {
      emit('close')
    }
    const handeleSuccess = () => {
      emit('success', state.formData)
    }

    watchEffect(() => {
      if (props.visible) {
        state.formData = deepClone(props.initData)
        getFleetMarkers()
      }
      console.log(props, 'formTableCell')
    })
    return {
      handleClose,
      ...toRefs(state),
      CellAttr,
      CellStatus,
      handeleSuccess,
      columns,
      t
    }
  }
})
</script>
