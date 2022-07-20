import { input, textarea, select, radioGroup, datePicker, rangePicker } from '@/config/form'
import { required_check } from '@/utils/Form'
export const formListItem = [
  {
    is: 'title',
    label: '分类标题'
  },
  {
    is: input,
    name: 'input',
    label: '输入框',
    rules: [required_check()]
  },
  {
    is: select,
    name: 'select',
    label: '下拉框',
    rules: [required_check()]
  },
  {
    is: input,
    name: 'boxAmount',
    label: '下拉框',
    rules: [required_check()]
  },
  {
    is: radioGroup,
    name: 'radioGroup',
    label: '单选',
    rules: [required_check()],
    radioList: [
      { label: 'message.normal', value: '0' },
      { label: 'message.stop', value: '1' }
    ]
  },
  {
    is: datePicker,
    name: 'datePicker',
    label: '时间范围'
  },
  {
    is: rangePicker,
    name: 'rangePicker',
    label: '时间范围'
  },
  {
    is: textarea,
    name: 'textarea',
    label: '文本框'
  }
]
