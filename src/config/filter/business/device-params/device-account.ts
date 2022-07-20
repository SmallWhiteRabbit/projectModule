import { input } from '@/config/form'

const filterData = {
  name: ''
}

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'name',
      label: 'deviceAccount.name'
    }
  ],
  filterData
}
