import { input, select } from '@/config/form'

const filterData = { menuType: '', parentName: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: select,
      name: 'menuType',
      label: 'menuManage.menuType',
      options: [
        { label: 'menuManage.menu', value: '1' },
        { label: 'menuManage.btn', value: '0' }
      ]
    },
    {
      is: input,
      name: 'parentName',
      label: 'menuManage.parentName'
    }
  ],
  filterData
}
