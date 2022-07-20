import type { ITableRow, IWayPointProps } from '@/config/table/business/device-params/device-account'
import { input, treeSelect, datePicker } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formListItem: [
    {
      is: input,
      name: 'name',
      label: 'deviceAccount.name',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'description',
      label: 'deviceAccount.describe',
      rules: [required_check()]
    },
    {
      is: treeSelect,
      name: 'factoryZoneId',
      label: 'AgvConfig.agvPosition',
      rules: [required_check()],
      treeList: [] as ITree[],
      fieldNames: { children: 'children', label: 'label', key: 'id', value: 'id' }
    },
    {
      is: input,
      name: 'model',
      label: 'deviceAccount.model'
    },
    {
      is: input,
      name: 'manufacturer',
      label: 'deviceAccount.manufacturer'
    },
    {
      is: input,
      name: 'specification',
      label: 'deviceAccount.specification'
    },
    {
      is: datePicker,
      name: 'setupTime',
      label: 'deviceAccount.installDate'
    }
  ] as IFormItemType[],
  formData: {
    id: '',
    name: '',
    describe: '',
    model: '',
    specification: '',
    setupTime: '',
    manufacturer: '',
    description: '',
    factoryZoneId: '',
    factoryZoneName: ''
  } as ITableRow,
  formWayPoint: {
    id: '',
    name: '',
    describe: '',
    model: '',
    specification: '',
    setupTime: '',
    manufacturer: '',
    description: '',
    factoryZoneId: '',
    factoryZoneName: '',
    list: []
  } as IWayPointProps
}
