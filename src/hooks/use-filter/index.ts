import type { Ref, UnwrapNestedRefs } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { ref, reactive } from 'vue'

type FilterResetHook = () => void
export type FilterHooks = {
  formRef: Ref<FormInstance | undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterData: UnwrapNestedRefs<any>
  reset: FilterResetHook
}

export interface FilterItemConfig {
  is: string
  name: string
  label?: string
  value?: unknown
}

/**
 * 搜索hooks
 *
 * @param {FilterItemConfig[]} filterConfigList 配置列表
 * @param {object} formData 搜索数据
 * @returns {FilterHooks} 筛选hooks
 */
export function useFilter<T extends FilterItemConfig, F extends object>(filterConfigList: T[], formData: F): FilterHooks {
  const initFormData = Object.assign({}, formData)
  const formRef = ref<FormInstance>()
  const filterData = reactive(formData)

  /**
   * 重置
   */
  function reset(): void {
    Object.assign(filterData, initFormData)
  }

  return {
    formRef,
    filterData,
    reset
  }
}
