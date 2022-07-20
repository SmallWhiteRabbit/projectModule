import { input, select } from '@/config/form'
const filterData = { postName: '', postCode: '', status: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'postName',
      label: 'station.stationName'
    },
    {
      is: input,
      name: 'postCode',
      label: 'station.stationCode'
    },
    {
      is: select,
      name: 'status',
      label: 'system.status',
      options: [
        {
          label: 'message.normal',
          value: '0'
        },
        {
          label: 'message.stop',
          value: '1'
        }
      ]
    }
  ],
  filterData
}
