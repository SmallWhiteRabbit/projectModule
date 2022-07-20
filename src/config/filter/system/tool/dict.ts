import { input, select } from '@/config/form'

const filterData = { dictLabel: '', dictType: '', status: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'dictLabel',
      label: 'dictManage.dictionaryName'
    },
    {
      is: input,
      name: 'dictType',
      label: 'dictManage.dictionaryType'
    },
    {
      is: select,
      name: 'status',
      label: 'system.status',
      options: [
        {
          label: 'system.all',
          value: ''
        },
        {
          label: 'dictManage.status.0',
          value: '0'
        },
        {
          label: 'dictManage.status.1',
          value: '1'
        }
      ]
    }
  ],
  filterData
}
