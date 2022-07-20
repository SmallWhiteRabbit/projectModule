import { input } from '@/config/form'
const filterData = { account: '', userName: '', phone: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'account',
      label: 'userManage.account'
    },
    {
      is: input,
      name: 'userName',
      label: 'userManage.name'
    },
    {
      is: input,
      name: 'phone',
      label: 'userManage.phone'
    }
  ],
  filterData
}
