import type { ITableRow } from '@/config/table/business/factory'
import { input, treeSelect, select } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    name: '',
    level: 1,
    parentId: '',
    fleetMapId: '',
    fleetMapName: ''
  } as ITableRow,
  formListItem: [
    {
      is: treeSelect,
      name: 'parentId',
      label: 'factory.parentName',
      rules: [required_check()],
      treeList: [] as ITree[],
      fieldNames: { children: 'children', label: 'label', key: 'id', value: 'id' }
    },
    {
      is: input,
      name: 'name',
      label: 'factory.businessName',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'level',
      label: 'factory.businessLevel',
      rules: [required_check()]
    },
    {
      is: select,
      name: 'fleetMapId',
      label: 'factory.fleetMapName',
      options: [],
      fieldNames: { label: 'name', value: 'id', options: 'options' },
      rules: [required_check()]
    }
  ]
}
