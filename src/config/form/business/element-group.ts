import type { ITableRow } from '@/config/table/business/element-group'
import { input, treeSelect, select } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    agvIds: [],
    agvType: '',
    areaUnitIds: [],
    description: '',
    deviceIds: [],
    factoryZoneId: '',
    id: '',
    name: '',
    priorityEnable: false,
    remark: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'name',
      label: 'elementGroup.name',
      rules: [required_check()]
    },
    {
      is: treeSelect,
      name: 'factoryZoneId',
      label: 'elementGroup.position',
      rules: [required_check()],
      treeList: [] as ITree[],
      fieldNames: { children: 'children', label: 'label', key: 'id', value: 'id' }
    },
    {
      is: select,
      name: 'deviceIds',
      label: 'elementGroup.binding',
      options: [],
      fieldNames: { label: 'name', value: 'id', options: 'options' },
      rules: [required_check()],
      mode: 'multiple'
    },
    {
      is: select,
      name: 'areaUnitIds',
      label: 'elementGroup.warehouseBinding',
      options: [],
      fieldNames: { label: 'code', value: 'id', options: 'options' },
      rules: [required_check()],
      mode: 'multiple'
    },
    {
      is: input,
      name: 'agvType',
      label: 'elementGroup.agvType',
      rules: [required_check()]
    },
    {
      is: select,
      name: 'agvIds',
      label: 'elementGroup.agvBinding',
      options: [],
      fieldNames: { label: 'fleetAgvId', value: 'id', options: 'options' },
      rules: [required_check()],
      mode: 'multiple'
    },
    {
      is: input,
      name: 'description',
      label: 'elementGroup.descriptors'
    }
  ]
}
