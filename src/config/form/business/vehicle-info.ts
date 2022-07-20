import type { ITableRow } from '@/config/table/business/vehicle-info'
import { input } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    id: '',
    type: '',
    model: '',
    specification: '',
    code: '',
    bottomCode: '',
    manufacturer: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'type',
      label: 'vehicleInfo.type',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'model',
      label: 'vehicleInfo.model',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'specification',
      label: 'vehicleInfo.specification',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'code',
      label: 'vehicleInfo.code',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'bottomCode',
      label: 'vehicleInfo.bottomCode'
    },
    {
      is: input,
      name: 'manufacturer',
      label: 'vehicleInfo.manufacturer'
    }
  ]
}
