import type { PropType } from 'vue'
import { defineComponent, reactive } from 'vue'
import { useLocale } from 'youibot-plus'
type successFunc = () => {}
type resetFunc = () => {}
export default defineComponent({
  name: 'MyModalForm',
  props: {
    showCancle: {
      type: Boolean,
      default: true
    },
    showSuccess: {
      type: Boolean,
      default: true
    },
    formList: {
      type: Array as PropType<IFormItemType[]>
    },
    formData: {
      type: Object
    }
  },

  setup(props, { slots, emit, attrs }) {
    const { t } = useLocale()
    const state = reactive({
      //调取form中表单校验
      handle_success: () => {},
      reset_form: () => {}
    })

    /**
     * 校验表单
     *
     * @param {successFunc} s 提交方法
     */
    function validForm(s: successFunc): void {
      state.handle_success = s
    }

    /**
     * 重置表单
     *
     * @param {resetFunc} s 重置方法
     */
    function reset_form(s: resetFunc): void {
      state.reset_form = s
    }

    /**
     *cancle按钮
     */
    function handle_cancel(): void {
      emit('cancel')
      state.reset_form()
    }
    /**
     *success
     */
    function handle_success(): void {
      state.handle_success()
    }

    /**
     *  submit按钮
     *
     * @param {object} formData 数据
     */
    function handle_submit(formData: object): void {
      emit('update:formData', formData)
      emit('success')
    }

    /**
     * select change事件
     *
     * @param {object} formData 数据
     * @param {string} props 属性
     */
    function handle_change(formData: object, props?: string): void {
      emit('update:formData', formData)
      emit('change', props)
    }

    /**
     *渲染cancel按钮
     *
     *@returns {JSX.Element} 返回值
     */
    function render_btn_cancel(): JSX.Element | undefined {
      if (props.showCancle) {
        return <a-button onClick={handle_cancel}>{t('message.cancel')}</a-button>
      }
    }

    /**
     * 渲染submit按钮
     *
     * @returns {JSX.Element} 返回值
     */
    function render_btn_submit(): JSX.Element | undefined {
      if (props.showSuccess) {
        return (
          <a-button type="primary" onClick={handle_success}>
            {t('message.submit')}
          </a-button>
        )
      }
    }

    /**
     * 渲染按钮
     *
     * @returns {JSX.Element} 返回值
     */
    function render_btn(): JSX.Element {
      return (
        <div class="form_btn">
          {render_btn_cancel()}
          {render_btn_submit()}
        </div>
      )
    }
    /**
     * 渲染form模块
     *
     * @returns {JSX.Element } 返回值
     */
    function render_form(): JSX.Element {
      return (
        <my-form
          layout="vertical"
          formData={props.formData}
          formList={props.formList}
          onValidForm={validForm}
          onResetForm={reset_form}
          onSubmit={handle_submit}
          onChange={handle_change}
          v-slots={slots}></my-form>
      )
    }
    /**
     * 渲染content模块
     *
     * @returns {JSX.Element | undefined } 返回值
     */
    function render_content(): JSX.Element | undefined {
      if (attrs.visible) {
        return <div>{render_form()}</div>
      }
    }

    /**
     * 渲染slots
     *
     * @returns {object} 返回值
     */
    function render_slots(): object {
      const drawerSlots: { content: () => void; footer?: () => void } = {
        content: () => {
          return render_content()
        },
        footer: () => {
          return render_btn()
        }
      }

      return drawerSlots
    }

    return (): JSX.Element => {
      return <my-modal class="my-modal-form" closable={true} onClose={handle_cancel} {...attrs} v-slots={render_slots()}></my-modal>
    }
  }
})
