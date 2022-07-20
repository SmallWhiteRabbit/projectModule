import { input, select } from '@/config/form'
const filterData = { title: '', operName: '', operatorType: '', status: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'title',
      label: 'operateLog.sysModule'
    },
    {
      is: input,
      name: 'operName',
      label: 'operateLog.operateMemeber'
    },
    {
      is: select,
      name: 'operatorType',
      label: 'operateLog.operateType',
      options: [
        {
          label: 'operateLog.pc',
          value: '1'
        },
        {
          label: 'operateLog.mobile',
          value: '2'
        },
        {
          label: 'operateLog.other',
          value: '0'
        }
      ]
    },
    {
      is: select,
      name: 'status',
      label: 'operateLog.operateStatus',
      options: [
        {
          label: 'operateLog.normal',
          value: '1'
        },
        {
          label: 'operateLog.unnormal',
          value: '0'
        }
      ]
    }
  ],
  filterData
}
