import { input, rangePicker, select } from '@/config/form'

const filterData = { task1: '', time: '', user: '', map: '' }

export type TFilterData = typeof filterData
export default {
  filterConfigList: [
    {
      is: input,
      name: 'task1',
      label: '任务编号'
    },
    {
      is: rangePicker,
      name: 'time',
      label: '开始日期'
    },
    {
      is: input,
      name: 'user',
      label: '发起人'
    },
    {
      is: select,
      name: 'map',
      label: '地图'
    }
  ],
  filterData
}
