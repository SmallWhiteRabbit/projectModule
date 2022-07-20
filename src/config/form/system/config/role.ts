import type { ITableRow } from '@/config/table/system/config/role'
import { input, radioGroup, treeSelect } from '@/config/form'
import { required_check } from '@/utils/Form'
import { TreeSelect } from 'ant-design-vue'
export default {
  formData: {
    roleId: '',
    roleName: '',
    menusIds: [],
    deptIds: [],
    status: '0'
  } as ITableRow,

  formListItem: [
    {
      is: input,
      name: 'roleName',
      label: 'roleManage.roleName',
      rules: [required_check()]
    },
    {
      is: treeSelect,
      name: 'menusIds',
      label: 'roleManage.menuRights',
      rules: [required_check()],
      treeList: [] as ITree[],
      multiple: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      treeCheckable: true
    },
    {
      is: treeSelect,
      name: 'deptIds',
      label: 'roleManage.dataRights',
      rules: [required_check()],
      treeList: [] as ITree[],
      multiple: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      treeCheckable: true
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
  ] as IFormItemType[]
}
