import type { PropType } from 'vue'
import { defineComponent, reactive } from 'vue'
import { useLocale } from 'youibot-plus'
type TValidFunc = () => {}
type TResetFunc = () => {}
export default defineComponent({
  name: 'MyDrawerForm',
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
    },
    isBtnFixBottom: {
      type: Boolean,
      default: true
    },
    formRules: {
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
     * @param {TValidFunc} s 校验方法
     */
    function valid_form(s: TValidFunc): void {
      state.handle_success = s
    }

    /**
     * 重置表单
     *
     * @param {TResetFunc} s 重置方法
     */
    function reset_form(s: TResetFunc): void {
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
     * 成功回调
     */
    function handle_success(): void {
      state.handle_success()
    }
    /**
     * submit按钮
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
     * @param {string} props  字段
     */
    function handle_change(formData: object, props?: string): void {
      emit('update:formData', formData)
      emit('change', props)
    }

    /**
     * 渲染表单
     *
     * @returns {JSX.Element} 返回值
     */
    function render_form(): JSX.Element {
      return (
        <my-form
          formData={props.formData}
          formList={props.formList}
          formRules={props.formRules}
          onValidForm={valid_form}
          onResetForm={reset_form}
          onSubmit={handle_submit}
          onChange={handle_change}
          v-slots={slots}></my-form>
      )
    }

    /**
     * 渲染按钮
     *
     * @returns {JSX.Element} 返回值
     */
    function render_btn(): JSX.Element {
      return (
        <div class="form_btn">
          {props.showCancle ? <a-button onClick={handle_cancel}>{t('message.cancel')}</a-button> : 'fff'}
          {props.showSuccess ? (
            <a-button type="primary" onClick={handle_success}>
              {t('message.submit')}
            </a-button>
          ) : (
            'ooo'
          )}
        </div>
      )
    }

    /**
     * 渲染内容
     *
     *@returns {JSX.Element} 返回值
     */
    function render_content(): JSX.Element {
      if (attrs.visible) {
        if (props.isBtnFixBottom) {
          return render_form()
        } else {
          return (
            <div>
              {render_form()} {render_btn()}
            </div>
          )
        }
      } else {
        return <div></div>
      }
    }

    /**
     * slot渲染
     *
     * @returns {object} 返回值
     */
    function render_slots(): object {
      const drawerSlots: { content: () => void; footer?: () => void } = {
        content: () => {
          return render_content()
        }
      }

      if (props.isBtnFixBottom) {
        drawerSlots.footer = (): JSX.Element => {
          return render_btn()
        }
      }
      return drawerSlots
    }

    return (): JSX.Element => {
      return <my-drawer class="my-drawer-form" closable={true} onClose={handle_cancel} {...attrs} v-slots={render_slots()}></my-drawer>
    }
  }
})
