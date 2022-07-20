import type { PropType } from 'vue'
import { defineComponent, toRaw, reactive, onMounted } from 'vue'
import { SyncOutlined } from '@ant-design/icons-vue'
import { useLocale } from 'youibot-plus'
import { useFilter } from '@/hooks/use-filter/index'

export default defineComponent({
  name: 'MyFilter',
  components: {
    SyncOutlined
  },
  props: {
    filterConfigList: {
      type: Array as PropType<IFormItemType[]>,
      required: true
    },
    filterData: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const filterConfigList = reactive(props.filterConfigList)
    const { t } = useLocale()
    const { reset, formRef, filterData } = useFilter(filterConfigList, props.filterData)

    /**
     * 触发获取列表函数
     *
     * @param {KeyboardEvent} e 回车事件对象
     * @param {string} name 字段名称
     */
    function handleChange(e: KeyboardEvent, name: string): void {
      emit('change', toRaw(filterData), name)
    }

    /**
     * 重置筛选表单数据
     */
    function handleReset(): void {
      reset()
      emit('change', toRaw(filterData), '')
    }

    /**
     * placeholder多语言
     *
     * @param {string} placeholder 提示语
     * @returns {string} 转换后
     */
    function placeholderT(placeholder: string): string {
      return placeholder ? placeholder : t('message.placeholder')
    }
    /**
     * 渲染input函数
     *
     * @param {IFormItemType} filterItem 搜索项
     * @returns {JSX.Element} JSX.Element
     */
    function renderInput(filterItem: IFormItemType): JSX.Element {
      const { name, placeholder, ...rest } = filterItem
      const newPlaceholder = placeholderT(placeholder || '')

      return (
        <a-input
          type="text"
          v-model={[filterData[name], 'value']}
          placeholder={newPlaceholder}
          onPressEnter={handleChange}
          class="filter-form_input"
          {...rest}
        />
      )
    }
    /**
     * 渲染 a-select
     *
     * @param {IFormItemType} filterItem 搜索项
     * @returns {JSX.Element} JSX.Element
     */
    function renderSelect(filterItem: IFormItemType): JSX.Element {
      const { name, placeholder, ...rest } = filterItem
      const newPlaceholder = placeholderT(placeholder || '')

      return (
        <a-select
          v-model={[filterData[name], 'value']}
          placeholder={newPlaceholder}
          class="filter-form_select"
          onChange={handleChange}
          {...rest}
        />
      )
    }

    /**
     * 渲染 a-range-picker
     *
     * @param {IFormItemType} filterItem 搜索项
     * @returns {JSX.Element} JSX.Element
     */
    function renderRangePicker(filterItem: IFormItemType): JSX.Element {
      const { name, ...rest } = filterItem

      return <a-range-picker v-model={[filterData[name], 'value']} {...rest} />
    }

    /**
     * 渲染条件判断
     *
     * @param {IFormItemType} filterItem 搜索项
     * @returns  {JSX.Element}  JSX.Element
     */
    function renderComponents(filterItem: IFormItemType): JSX.Element {
      const { is } = filterItem

      if (is === 'a-input') {
        return renderInput(filterItem)
      } else if (is === 'a-select') {
        return renderSelect(filterItem)
      } else if (is === 'a-range-picker') {
        return renderRangePicker(filterItem)
      }

      return <div></div>
    }

    onMounted(() => {
      handleReset()
    })

    return (): JSX.Element => {
      if (filterConfigList && filterConfigList.length > 0) {
        return (
          <section class="filter">
            <a-form model={filterData} ref={formRef} layout="inline" class="filter-form">
              {filterConfigList?.map((item: IFormItemType) => {
                return (
                  <a-form-item label={t(item.label)} name={item.name}>
                    {renderComponents(item)}
                  </a-form-item>
                )
              })}

              <a-button type="link" class="filter-btn_reset" onClick={handleReset}>
                <sync-outlined />
                {t('system.reset')}
              </a-button>
            </a-form>
          </section>
        )
      } else {
        return <section class="filter"></section>
      }
    }
  }
})
