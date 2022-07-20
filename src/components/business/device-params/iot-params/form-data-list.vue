<template>
  <my-drawer class="my-drawer-form" :visible="visible" :title="t('IOTParams.dataListTitle')">
    <template #content>
      <a-form ref="formRef" :model="formData" v-bind="formItemLayout">
        <a-form-item :label="t('IOTParams.name') + ':'">
          {{ formData.deviceName }}
        </a-form-item>
        <a-form-item :label="t('IOTParams.describe') + ':'">
          {{ formData.deviceDescription }}
        </a-form-item>
        <a-form-item :label="t('IOTParams.macUrl') + ':'">{{ formData.macAddress }}</a-form-item>
        <a-form-item :label="t('IOTParams.ip') + ':'">{{ formData.ipAddress }}</a-form-item>
        <ImportExport :template-url="templateUrlSignal" @fileUpload="handleImport"></ImportExport>
        <div v-for="(list, index) in formData.list" :key="list.id" class="add-batch-container">
          <p class="del" @click="handleRemove(index)">{{ t('system.del') }}</p>
          <a-form-item :name="['list', index, 'signalCode']" :label="t('IOTParams.code')" :rules="rules">
            <a-input v-model:value="list.signalCode"></a-input>
          </a-form-item>
          <a-form-item :name="['list', index, 'dataType']" :label="t('IOTParams.dataType')" :rules="rules">
            <a-select v-model:value="list.dataType" @change="changeDataType($event, index)">
              <a-select-option v-for="flag in dataType" :key="flag" :value="flag">{{ flag }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :name="['list', index, 'dataFlag']" :label="t('IOTParams.dataId')" :rules="list.dataType == 'AI' ? '' : rules">
            <a-select v-model:value="list.dataFlag" :disabled="list.dataType == 'AI'">
              <a-select-option v-for="flag in dataFlag" :key="flag" :value="flag">{{ flag }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :name="['list', index, 'signalDescription']" :label="t('IOTParams.signalDesc')" :rules="rules">
            <a-input v-model:value="list.signalDescription"></a-input>
          </a-form-item>
        </div>
        <p class="form-title" @click="handleAddTo">{{ t('system.addTo') }}</p>
      </a-form>
    </template>
    <template #footer>
      <a-button @click="cancel">{{ t('message.cancel') }}</a-button>
      <a-button type="primary" @click="success">{{ t('message.submit') }}</a-button>
    </template>
  </my-drawer>
</template>

<script lang="ts">
import type { FormInstance } from 'ant-design-vue'
import type { IDataListProps, ITableDataListRow } from '@/config/table/business/device-params/iot-params'
import type { PropType } from 'vue'
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { signalAdd, signallist, importSignalData, templateUrlSignal } from '@/utils/api/business/iot-params'
import { dataFlag, dataType, EDataType } from '@/utils/variable'
import ImportExport from '@/components/common/import-export.vue'
import { useLocale, deepClone } from 'youibot-plus'
export default defineComponent({
  name: 'FormDataList',
  components: {
    ImportExport
  },
  props: {
    initData: {
      type: Object as PropType<IDataListProps>,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'success'],
  setup(props, { emit }) {
    const state = reactive({
      formData: deepClone(props.initData)
    })
    const { t } = useLocale()
    const formRef = ref<FormInstance>()

    const rules = [{ trigger: 'blur', required: true, message: t('message.placeholder') }]

    const cancel = () => {
      emit('cancel')
    }

    const addData = () => {
      const formData = {
        deviceId: state.formData.deviceId,
        list: [] as ITableDataListRow[]
      }

      state.formData.list.forEach((item: ITableDataListRow) => {
        formData.list.push(item)
      })
      signalAdd(formData).then(() => {
        emit('success')
      })
    }

    /**
     * 成功回调
     */
    async function success() {
      try {
        if (formRef.value) {
          formRef.value.validateFields().then(() => {
            addData()
          })
        }
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    }

    const getSignalList = () => {
      signallist({ deviceId: state.formData.deviceId }).then(res => {
        let { data } = res

        if (data) {
          state.formData.list = data
        }
      })
    }
    const handleAddTo = () => {
      state.formData.list.push({
        dataFlag: '',
        dataType: '',
        deviceId: state.formData.deviceId,
        deviceIotId: state.formData.id,
        id: '',
        signalCode: '',
        signalDescription: '',
        prop: {}
      })
    }
    const handleRemove = (index: number) => {
      state.formData.list.splice(index, 1)
    }
    const changeDataType = (value: string, index: number) => {
      if (value === EDataType.AI) {
        state.formData.list[index].dataFlag = ''
      }
    }
    const handleImport = (file: File) => {
      const formData = new FormData()

      formData.append('file', file)
      importSignalData(formData).then(() => {
        getSignalList()
      })
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      labelAlign: 'left'
    }

    watchEffect(() => {
      state.formData = deepClone(props.initData)
      if (props.visible) {
        getSignalList()
      }
    })

    return {
      success,
      cancel,
      rules,
      formRef,
      ...toRefs(state),
      handleAddTo,
      handleRemove,
      dataFlag,
      dataType,
      changeDataType,
      templateUrlSignal,
      handleImport,
      t,
      formItemLayout
    }
  }
})
</script>
