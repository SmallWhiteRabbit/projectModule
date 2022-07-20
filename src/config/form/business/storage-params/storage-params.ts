import type { ITableRow } from '@/config/table/business/storage-params/storage-params'
import { input, treeSelect } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    id: '',
    name: '',
    code: '',
    factoryZoneId: '',
    factoryZoneName: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'code',
      label: 'storageParams.warehouseCode',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'name',
      label: 'storageParams.warehouseName',
      rules: [required_check()]
    },
    {
      is: treeSelect,
      name: 'factoryZoneId',
      label: 'storageParams.location',
      rules: [required_check()],
      treeList: [] as ITree[],
      fieldNames: { children: 'children', label: 'label', key: 'id', value: 'id' }
    }
  ]
}
