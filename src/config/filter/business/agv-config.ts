import { input } from '@/config/form'

const filterData = {
  fleetAgvId: ''
}

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'fleetAgvId',
      label: 'AgvConfig.agvNum'
    }
  ],
  filterData
}
