import type { PropType } from 'vue'
import { defineComponent, onMounted } from 'vue'
import { useLocale, deepClone } from 'youibot-plus'
import selectAdd from './select/select-add.vue'
import { getSlot } from '@/utils/props'
import { useForm } from '@/hooks/use-form/index'
export default defineComponent({
  name: 'MyForm',
  components: { ASelectAdd: selectAdd },
  props: {
    formList: {
      type: Array as PropType<IFormItemType[]>,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object
    }
  },
  emits: ['change', 'valid-form', 'submit', 'reset-form'],
  setup(props, { slots, emit }) {
    const { t } = useLocale()
    const { formRef, formItemLayout, reset, valid } = useForm()

    /**
     * 表单change事件
     *
     * @param {string} prop 改变的字段
     */
    function handle_change(prop?: string): void {
      emit('change', props.formData, prop)
    }
    /**
     * 渲染自定义模块
     *
     * @param {IFormItemType} formItem 每一项
     * @param {object} scope scope
     * @returns {unknown} dom
     */
    function render_slots(formItem: IFormItemType, scope: object): unknown {
      const { slotName } = formItem

      if (slotName) {
        return getSlot(slots, slotName, scope)
      } else {
        return <div></div>
      }
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
     * 渲染input
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_input(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')

      return <a-input v-model={[props.formData[name], 'value']} placeholder={newPlaceholder} {...rest} />
    }

    /**
     * 渲染inputpassword
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_input_password(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')

      return <a-input-password v-model={[props.formData[name], 'value']} placeholder={newPlaceholder} {...rest} />
    }

    /**
     * 渲染select
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_select(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, fieldNames, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')
      const newFieldNames = fieldNames ? fieldNames : { label: 'label', value: 'value', options: 'options' }

      return (
        <a-select
          v-model={[props.formData[name], 'value']}
          placeholder={newPlaceholder}
          fieldNames={newFieldNames}
          {...rest}
          onChange={(): void => handle_change(name)}
        />
      )
    }

    /**
     * 渲染textarea
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_textarea(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, fieldNames, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')

      return <a-textarea v-model={[props.formData[name], 'value']} placeholder={newPlaceholder} {...rest} />
    }

    /**
     * 渲染radio
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_radio_group(formItem: IFormItemType): JSX.Element {
      const { is, name, radioList, ...rest } = formItem

      return (
        <a-radio-group v-model={[props.formData[name], 'value']} {...rest}>
          {radioList?.map(radio => {
            return <a-radio value={radio.value}>{t(radio.label)}</a-radio>
          })}
        </a-radio-group>
      )
    }

    /**
     * 渲染treeselect
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_tree_select(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, fieldNames, multiple, treeCheckable, showCheckedStrategy, treeList, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')
      const newFieldNames = fieldNames ? fieldNames : { children: 'children', label: 'label', key: 'id', value: 'id' }

      return (
        <a-tree-select
          v-model={[props.formData[name], 'value']}
          tree-data={treeList}
          placeholder={newPlaceholder}
          fieldNames={newFieldNames}
          tree-checkable={treeCheckable}
          show-checked-strategy={showCheckedStrategy}
          onChange={(): void => handle_change(name)}
          {...rest}
        />
      )
    }

    /**
     * 渲染datepicker
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_date_picker(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')

      return <a-date-picker v-model={[props.formData[name], 'value']} placeholder={newPlaceholder} {...rest} />
    }

    /**
     * 渲染selectadd
     *
     * @param {IFormItemType} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_select_add(formItem: IFormItemType): JSX.Element {
      const { is, name, placeholder, fieldNames, ...rest } = formItem
      const newPlaceholder = placeholderT(placeholder || '')
      const newFieldNames = fieldNames ? fieldNames : { label: 'label', value: 'value', options: 'options' }

      return (
        <a-select-add
          v-model={[props.formData[name], 'value']}
          fieldNames={newFieldNames}
          placeholder={newPlaceholder}
          {...rest}
          onChange={(): void => handle_change(name)}
        />
      )
    }

    /**
     * 渲染rangepicker
     *
     * @param {object} formItem 每一个Item
     * @returns {unknown} JSX.Element
     */
    function render_range_picker(formItem: IFormItemType): JSX.Element {
      const { name, ...rest } = formItem

      return <a-range-picker v-model={[props.formData[name], 'value']} {...rest} />
    }

    /**
     * 渲染组件
     *
     * @param {object} formItem 每一个Item
     * @returns {JSX.Element} JSX.Element
     */
    function render_components(formItem: IFormItemType): JSX.Element | object {
      const { is, slotName } = formItem

      if (slotName) {
        return (scope: object) => {
          return render_slots(formItem, scope)
        }
      } else {
        switch (is) {
          case 'a-input':
            return render_input(formItem)
          case 'a-input-password':
            return render_input_password(formItem)
          case 'a-select':
            return render_select(formItem)
          case 'a-textarea':
            return render_textarea(formItem)
          case 'a-radio-group':
            return render_radio_group(formItem)
          case 'a-tree-select':
            return render_tree_select(formItem)
          case 'a-date-picker':
            return render_date_picker(formItem)
          case 'a-select-add':
            return render_select_add(formItem)
          case 'a-range-picker':
            return render_range_picker(formItem)
          default:
            return <div></div>
        }
      }
    }
    /**
     * 校验规则 多语言转换
     *
     * @param {object} item formitem
     * @returns {object} 返回
     */
    function render_rules(item: IFormItemType): IRules[] | undefined {
      const newRules = deepClone(item.rules)

      newRules?.forEach(item => {
        if (item.message) {
          item.message = t(item.message)
        }
      })

      return newRules
    }

    /**
     * 表单校验
     *
     */
    function valid_form(): void {
      valid(() => {
        emit('submit', props.formData)
      })
    }
    onMounted(() => {
      emit('valid-form', valid_form)
      emit('reset-form', reset)
    })

    return (): JSX.Element => {
      return (
        <a-form class="my-form" model={props.formData} ref={formRef} {...formItemLayout}>
          {props.formList?.map((item: IFormItemType) => {
            if (item.is === 'title') {
              return <p class="formItemTitle">{t(item.label)}</p>
            } else {
              return (
                <a-form-item label={t(item.label)} rules={render_rules(item)} name={item.name}>
                  {render_components(item)}
                </a-form-item>
              )
            }
          })}
        </a-form>
      )
    }
  }
})
