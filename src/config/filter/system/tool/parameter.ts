import { input } from '@/config/form'
const filterData = { configName: '', configKey: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'configName',
      label: 'systemTool.parameter.parameterName'
    },
    {
      is: input,
      name: 'configKey',
      label: 'systemTool.parameter.parametersKeyName'
    }
  ],
  filterData
}
