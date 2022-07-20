import { input } from '@/config/form'
const filterData = { type: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'type',
      label: 'vehicleInfo.type'
    }
  ],
  filterData
}
