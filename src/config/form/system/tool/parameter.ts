import type { ITableRow } from '@/config/table/system/tool/parameter'
import { input, radioGroup, textarea } from '@/config/form'
import { required_check, required_select } from '@/utils/Form'
export default {
  formData: {
    configId: '',
    configKey: '',
    configName: '',
    configType: '',
    configValue: '',
    remark: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'configName',
      label: 'systemTool.parameter.parameterName',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'configKey',
      label: 'systemTool.parameter.parametersKeyName',
      rules: [required_check()],
      slotName: 'configKey'
    },
    {
      is: input,
      name: 'configValue',
      label: 'systemTool.parameter.parametersKeyValue',
      rules: [required_check()]
    },
    {
      is: radioGroup,
      name: 'configType',
      label: 'systemTool.parameter.builtIn',
      radioList: [
        { label: 'system.yes', value: 'Y' },
        { label: 'system.no', value: 'N' }
      ],
      rules: [required_select()]
    },
    {
      is: textarea,
      name: 'remark',
      label: 'systemTool.parameter.note'
    }
  ] as IFormItemType[]
}
