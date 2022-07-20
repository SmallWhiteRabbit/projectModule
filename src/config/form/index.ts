export type TOption = {
  label?: string
  text?: string
  value: string | number
}
export type TRadio = {
  label: string
  value: string | number
}

export interface ITreeDataType {
  children?: Array<ITreeDataType>
  id: string
  label: string
}

export type TFormItem = {
  label: string
  is: string
  slotName?: string
  type?: string
  min?: number
  max?: number
  prop: string
  rows?: number
  step?: number
  rules?: Array<IRules>
  placeholder?: string
  disabled?: boolean
  options?: TOption[]
  tipHtml?: string
  radio?: TRadio[]
  activeValue?: number
  inActiveValue?: number
  switch?: string
  checkboxs?: TOption[]
  showPwd?: boolean
  maxlength?: string | number
  showWordLimit?: boolean
  btnShow?: boolean
  controls?: boolean
  stepStrictly?: boolean
  treeData: ITreeDataType[]
}

export const treeSelect = 'a-tree-select'
export const input = 'a-input'
export const radioGroup = 'a-radio-group'
export const select = 'a-select'
export const textarea = 'a-textarea'
export const datePicker = 'a-date-picker'
export const rangePicker = 'a-range-picker'

export const text = 'text'
export const inputPassword = 'a-input-password'
export const selectAdd = 'a-select-add'
/*
 * export const treeSelect = TreeSelect
 * export const input = Input
 * export const radioGroup = RadioGroup
 * export const select = Select
 * export const textarea = Textarea
 * export const datePicker = DatePicker
 * export const text = 'text'
 * export const inputPassword = InputPassword
 * export const selectAdd = aSelectAdd
 */
