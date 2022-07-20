import { input, select } from '@/config/form'

const filterData = { ipaddr: '', userName: '', params: '', status: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'ipaddr',
      label: 'loginLog.loginAddress'
    },
    {
      is: input,
      name: 'userName',
      label: 'loginLog.loginName'
    },
    {
      is: select,
      name: 'params',
      label: 'loginLog.institutionalEnquiry',
      options: [
        {
          label: 'system.all',
          value: ''
        }
      ]
    },
    {
      is: select,
      name: 'status',
      label: 'loginLog.loginStatus',
      options: [
        {
          label: 'system.all',
          value: ''
        },
        {
          label: 'system.success',
          value: '1'
        },
        {
          label: 'system.fail',
          value: '0'
        }
      ]
    }
  ],
  filterData
}
