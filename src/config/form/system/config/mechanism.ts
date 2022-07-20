import type { ITableRow } from '@/config/table/system/config/mechanism'
import { input, radioGroup, treeSelect } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    deptName: '',
    orderNum: '',
    parentId: 0,
    parentName: '',
    status: '0',
    deptId: ''
  } as ITableRow,
  formListItem: [
    {
      is: treeSelect,
      name: 'parentId',
      label: 'mechanism.parentName',
      rules: [required_check()],
      treeList: [] as ITree[]
    },
    {
      is: input,
      name: 'deptName',
      label: 'mechanism.deptName',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'orderNum',
      label: 'mechanism.orderNum',
      rules: [required_check()]
    },
    {
      is: radioGroup,
      name: 'status',
      label: 'system.status',
      radioList: [
        { label: 'message.normal', value: '0' },
        { label: 'message.stop', value: '1' }
      ]
    }
  ]
}
