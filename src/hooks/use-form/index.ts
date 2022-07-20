import type { FormInstance } from 'ant-design-vue'
import type { Ref } from 'vue'
import { ref } from 'vue'
interface useFormHooks {
  formRef: Ref
  formItemLayout: object
  reset: () => void
  valid: (callback: () => void) => Promise<void>
}

/**
 * form hooks
 *
 * @returns {useFormHooks} 返回值
 */
export function useForm(): useFormHooks {
  const formRef = ref<FormInstance>()
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left'
  }

  /**
   * 校验
   *
   * @param {()=>void} callback 回调
   */
  async function valid(callback: () => void): Promise<void> {
    try {
      if (formRef.value) {
        await formRef.value.validateFields()

        callback()
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  /**
   * 重置
   */
  function reset(): void {
    if (formRef.value) {
      formRef.value.resetFields()
    }
  }

  return {
    formRef,
    formItemLayout,
    reset,
    valid
  }
}
