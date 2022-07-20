import type { ITableRow } from '@/config/table/business/storage-params/storage'
import { input, select } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    amount: 1,
    code: '',
    id: '',
    layoutColumn: 1,
    layoutLayer: 1,
    layoutRow: 1,
    type: '',
    warehouseAreaId: '',
    cells: []
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'code',
      label: 'storageParams.storageCode',
      rules: [required_check()]
    },
    {
      is: select,
      name: 'type',
      label: 'storageParams.storageModel',
      options: [] as ISelectOptions[],
      rules: [required_check()]
    },
    {
      label: 'storageParams.specification',
      slotName: 'specification'
    }
  ]
}
