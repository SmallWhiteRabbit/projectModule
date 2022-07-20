import type { ITableRow } from '@/config/table/system/tool/dict'
import { input, radioGroup, textarea } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    dictCode: '',
    dictLabel: '',
    dictType: '',
    isDefault: 'Y',
    dictValue: '',
    status: '0',
    remark: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'dictLabel',
      label: 'dictManage.dictionaryName',
      placeholder: 'message.placeholder',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'dictType',
      label: 'dictManage.dictionaryType',
      placeholder: 'message.placeholder',
      rules: [required_check()],
      slotName: 'dictType'
    },
    {
      is: input,
      name: 'dictValue',
      label: 'dictManage.dictionaryKeysValue',
      placeholder: 'message.placeholder',
      rules: [required_check()]
    },
    {
      is: radioGroup,
      name: 'isDefault',
      label: 'dictManage.builtIn',
      radioList: [
        { label: 'system.yes', value: 'Y' },
        { label: 'system.no', value: 'N' }
      ]
    },
    {
      is: radioGroup,
      name: 'status',
      label: 'system.status',
      radioList: [
        { label: 'dictManage.status.0', value: '0' },
        { label: 'dictManage.status.1', value: '1' }
      ]
    },
    {
      is: textarea,
      name: 'remark',
      label: 'system.remark',
      placeholder: 'message.placeholder'
    }
  ] as IFormItemType[]
}
