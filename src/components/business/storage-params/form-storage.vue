<template>
  <my-drawer-form
    v-model:formData="formData"
    :visible="visible"
    :title="formData.id ? t('system.edit') : t('system.add')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success">
    <template #specification>
      <a-row>
        <a-col :span="6">
          <a-form-item prop="layoutLayer" :rules="rules">
            <a-input v-model:value="formData.layoutLayer" :disabled="isEdit"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="2" class="layout-layer">{{ t('storageParams.layer') }}</a-col>
        <a-col :span="6">
          <a-form-item prop="layoutColumn" :rules="rules">
            <a-input v-model:value="formData.layoutColumn" :disabled="isEdit"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="2" class="layout-layer">{{ t('storageParams.column') }}</a-col>
        <a-col :span="6" class="layout-layer">
          <a-form-item prop="layoutRow" :rules="rules">
            <a-input v-model:value="formData.layoutRow" :disabled="isEdit"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="2" class="layout-layer">{{ t('storageParams.row') }}</a-col>
      </a-row>
      <p class="form-title" @click="handleCell">{{ t('storageParams.cellEdit') }}</p>
    </template>
  </my-drawer-form>
  <TableCell :visible="isTableCell" :init-data="formCell" @close="close" @success="handleCellSuccess"></TableCell>
</template>

<script lang="ts">
import type { ITableRow as ITableCellRow } from '@/config/table/business/storage-params/table-cell'
import type { ITableRow as ITableStorageRow } from '@/config/table/business/storage-params/storage'
import type { PropType } from 'vue'
import { defineComponent, reactive, ref, toRefs, watchEffect, computed } from 'vue'
import { unitAdd, unitEdit } from '@/utils/api/business/storage-params'
import { UnitType } from '@/utils/variable'
import { useLocale, deepClone } from 'youibot-plus'
import TableCell from './form-table-cell.vue'
import FormConfig from '@/config/form/business/storage-params/storage'
export default defineComponent({
  name: 'FormStorage',
  components: {
    TableCell
  },
  props: {
    initData: {
      type: Object as PropType<ITableStorageRow>,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'success'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { formListItem } = FormConfig
    const state = reactive({
      formData: deepClone(props.initData),
      formCell: [] as ITableCellRow[],
      formListItem
    })
    const rules = [{ trigger: 'blur', required: true, message: t('message.placeholder') }]
    const isEdit = computed(() => {
      return state.formData.id !== ''
    })

    const generateStorageCell = () => {
      const { layoutLayer, layoutColumn, layoutRow, code, warehouseAreaId } = state.formData

      let list = []
      let cellRow = {
        actionCode: '',
        attribute: '',
        code: '',
        deviceId: '',
        deviceIotId: '',
        deviceIotSignalDescription: '',
        deviceIotSignalId: '',
        id: '',
        markerCode: '',
        remark: '',
        status: '',
        warehouseAreaUnitId: warehouseAreaId
      }

      for (let i = 1; i <= layoutLayer; i++) {
        for (let c = 1; c <= layoutColumn; c++) {
          for (let r = 1; r <= layoutRow; r++) {
            cellRow.code = code + '' + i + '' + c + '' + r
            list.push(deepClone(cellRow))
          }
        }
      }
      return list
    }

    const setStorageModel = () => {
      let list: ISelectOptions[] = []

      UnitType.forEach(item => {
        let obj = { label: item, value: item }

        list.push(obj)
      })
      state.formListItem[1].options = list
    }

    const cancel = () => {
      emit('cancel')
    }

    const addData = () => {
      unitAdd(state.formData).then(() => {
        emit('success', state.formData.warehouseAreaId)
      })
    }
    const editData = () => {
      unitEdit(state.formData).then(() => {
        emit('success', state.formData.warehouseAreaId)
      })
    }

    const dealFormData = () => {
      let {
        formCell,
        formData: { layoutLayer, layoutColumn, layoutRow }
      } = state
      // 储区数量

      state.formData.amount = layoutLayer * layoutColumn * layoutRow
      if (!formCell || formCell.length === 0) {
        let cellRowList = generateStorageCell()

        state.formData.cells = cellRowList
        state.formCell = cellRowList
      } else {
        state.formData.cells = state.formCell
      }
    }

    /**
     *
     */
    function success() {
      dealFormData()
      if (state.formData.id) {
        editData()
      } else {
        addData()
      }
    }

    let isTableCell = ref(false)
    const close = () => {
      isTableCell.value = false
    }

    const handleCellSuccess = (data: ITableCellRow[]) => {
      state.formCell = [...data]
      isTableCell.value = false
    }
    const handleCell = () => {
      const { cells } = state.formData

      if (cells && cells.length > 0) {
        state.formCell = state.formData.cells
      } else {
        state.formCell = generateStorageCell()
      }
      isTableCell.value = true
    }

    watchEffect(() => {
      if (props.visible) {
        state.formData = deepClone(props.initData)
        setStorageModel()
      }
    })

    return {
      success,
      cancel,
      rules,
      ...toRefs(state),
      isTableCell,
      close,
      handleCell,
      isEdit,
      handleCellSuccess,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.ant-col {
  .layout-layer {
    line-height: 32px;
    text-align: center;
  }

  .ant-form-item {
    margin-bottom: 0;
  }
}
</style>
