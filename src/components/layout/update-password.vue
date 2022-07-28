<template>
  <my-drawer-form
    v-model:formData="formData"
    :visible="visible"
    :title="t('system.changePsw')"
    :form-list="formListItem"
    @cancel="cancel"
    @success="success"></my-drawer-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getPassWordSameFn } from '@/utils/utils'
import { updatePwd } from '@/utils/api/system/user'
import { toNext } from '@/Router'
import FormConfig from '@/config/form/layout/update-password'
import { useLocale } from 'youibot-plus'

export default defineComponent({
  name: 'FormUpdatePsw',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'success'],
  setup(props, { emit }) {
    const { t } = useLocale()
    const { formData, formListItem } = FormConfig
    const state = reactive({
      formData,
      formListItem
    })

    if (state.formListItem[2].rules) {
      state.formListItem[2].rules.push({
        validator: getPassWordSameFn(function () {
          if (state.formData.newPassword !== state.formData.confirmPassword) {
            return false
          }
          return true
        }),
        trigger: 'blur'
      })
    }

    /**
     *
     */
    function cancel() {
      emit('cancel')
    }

    const updatePsw = () => {
      updatePwd(state.formData).then(() => {
        toNext({ path: '/login' })
        emit('success')
      })
    }

    /**
     * 提交
     */
    async function success() {
      updatePsw()
    }

    return {
      success,
      cancel,
      ...toRefs(state),
      t
    }
  }
})
</script>
