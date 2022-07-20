import { input } from '@/config/form'

const filterData = {
  deviceName: ''
}

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'deviceName',
      label: 'IOTParams.name'
    }
  ],
  filterData
}
