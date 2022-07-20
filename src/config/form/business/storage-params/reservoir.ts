import type { ITableRow } from '@/config/table/business/storage-params/reservoir'
import { input } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    code: '',
    id: '',
    name: '',
    warehouseId: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'code',
      label: 'storageParams.reservoirCode',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'name',
      label: 'storageParams.reservoirName',
      rules: [required_check()]
    }
  ]
}
