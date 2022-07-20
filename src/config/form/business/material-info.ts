import type { ITableRow } from '@/config/table/business/material-info'
import { input } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    id: '',
    name: '',
    brand: '',
    model: '',
    specification: '',
    code: '',
    amount: 0,
    manufacturer: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'name',
      label: 'materialInfo.name',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'brand',
      label: 'materialInfo.brand'
    },
    {
      is: input,
      name: 'model',
      label: 'materialInfo.model'
    },
    {
      is: input,
      name: 'specification',
      label: 'materialInfo.specification'
    },
    {
      is: input,
      name: 'code',
      label: 'materialInfo.code',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'amount',
      label: 'materialInfo.amount',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'manufacturer',
      label: 'materialInfo.manufacturer'
    }
  ]
}
