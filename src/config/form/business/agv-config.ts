import type { ITableRow } from '@/config/table/business/agv-config'
import { input, treeSelect, textarea } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formListItem: [
    {
      is: input,
      name: 'boxModel',
      label: 'AgvConfig.BoxType',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'boxAmount',
      label: 'AgvConfig.bosNum',
      rules: [required_check()]
    },

    {
      is: treeSelect,
      name: 'factoryZoneId',
      label: 'AgvConfig.agvPosition',
      rules: [required_check()],
      treeList: [] as ITree[],
      fieldNames: { children: 'children', label: 'label', key: 'id', value: 'id' }
    },
    {
      is: textarea,
      name: 'remark',
      label: 'AgvConfig.remarks'
    }
  ],
  formData: {
    boxModel: '',
    boxAmount: '',
    remark: '',
    factoryZoneId: ''
  } as ITableRow
}
