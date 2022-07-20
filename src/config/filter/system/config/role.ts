import { input } from '@/config/form'
const filterData = { roleName: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'roleName',
      label: 'roleManage.roleName'
    }
  ],
  filterData
}
