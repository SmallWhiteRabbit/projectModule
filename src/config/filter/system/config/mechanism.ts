import { input } from '@/config/form'
const filterData = { parentName: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'parentName',
      label: 'mechanism.parentName'
    }
  ],
  filterData
}
