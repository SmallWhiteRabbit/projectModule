<template>
  <my-drawer class="my-drawer-form" :visible="visible" :title="t('deviceAccount.wayPointTitle')">
    <template #content>
      <a-form ref="formRef" :model="formData" v-bind="formItemLayout">
        <a-form-item :label="t('IOTParams.name') + ':'">
          {{ formData.name }}
        </a-form-item>
        <a-form-item :label="t('IOTParams.describe') + ':'">{{ formData.description }}</a-form-item>
        <div v-for="(list, index) in formData.list" :key="list.id" class="add-batch-container">
          <p class="del" @click="handleRemove(index)">{{ t('system.del') }}</p>
          <a-form-item :name="['list', index, 'markerName']" :label="t('deviceAccount.wayPointName')" :rules="rules">
            <a-input v-model:value="list.markerName"></a-input>
          </a-form-item>
          <a-form-item :name="['list', index, 'markerCode']" :label="t('deviceAccount.point')" :rules="rules">
            <a-input v-model:value="list.markerCode"></a-input>
          </a-form-item>
          <a-form-item :name="['list', index, 'cellCode']" :label="t('deviceAccount.materialPort')" :rules="rules">
            <a-input v-model:value="list.cellCode"></a-input>
          </a-form-item>
          <a-form-item :name="['list', index, 'description']" :label="t('deviceAccount.pointDesc')" :rules="rules">
            <a-input v-model:value="list.description"></a-input>
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
import type { IWayPointProps, ITableWayPointRow } from '@/config/table/business/device-params/device-account'
import type { FormInstance } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { makerlist, makerAdd } from '@/utils/api/business/device-account'
import { useLocale, deepClone } from 'youibot-plus'

export default defineComponent({
  name: 'FormWayPoint',
  props: {
    initData: {
      type: Object as PropType<IWayPointProps>,
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
    const state = reactive({
      formData: deepClone(props.initData)
    })
    const formRef = ref<FormInstance>()

    const rules = [{ trigger: 'blur', required: true, message: t('message.placeholder') }]

    const cancel = () => {
      emit('cancel')
    }

    const addData = () => {
      const formData = {
        deviceId: state.formData.id,
        list: [] as ITableWayPointRow[]
      }

      state.formData.list.forEach((item: ITableWayPointRow) => {
        formData.list.push(item)
      })
      makerAdd(formData).then(() => {
        emit('success')
      })
    }

    const getMakerlist = () => {
      makerlist({ deviceId: state.formData.id }).then(res => {
        const { data } = res

        if (data) {
          state.formData.list = data
        }
      })
    }

    // 追加
    const handleAddTo = () => {
      state.formData.list.push({
        description: '',
        deviceId: state.formData.id,
        id: '',
        markerCode: '',
        markerName: '',
        cellCode: '',
        prop: {}
      })
    }

    /**
     *
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
    // 删除
    const handleRemove = (index: number) => {
      state.formData.list.splice(index, 1)
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      labelAlign: 'left'
    }

    watchEffect(() => {
      state.formData = deepClone(props.initData)
      if (props.visible) {
        getMakerlist()
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
      t,
      formItemLayout
    }
  }
})
</script>
