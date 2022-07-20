import { input, select } from '@/config/form'

const filterData = { jobName: '', status: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'jobName',
      label: 'schedule.taskName'
    },
    {
      is: select,
      name: 'status',
      label: 'schedule.taskStatus',
      options: [
        {
          label: 'system.all',
          value: ''
        },
        {
          label: 'schedule.normal',
          value: '0'
        },
        {
          label: 'schedule.suspend',
          value: '1'
        }
      ]
    }
  ],
  filterData
}
