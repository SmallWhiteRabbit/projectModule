import type { ITableRow } from '@/config/table/system/config/user'
import { required_check } from '@/utils/Form'
import { input, radioGroup, treeSelect, select } from '@/config/form'

export default {
  formData: {
    postIds: [],
    email: '',
    nickName: '',
    phonenumber: '',
    roleId: '',
    status: '',
    userName: '',
    userId: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'nickName',
      label: 'userManage.account',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'userName',
      label: 'userManage.name',
      rules: [required_check()]
    },
    {
      is: treeSelect,
      name: 'deptId',
      label: 'userManage.mechanism',
      treeList: [] as ITree[],
      rules: [required_check()]
    },
    {
      is: select,
      name: 'postIds',
      label: 'userManage.job',
      options: [],
      fieldNames: { label: 'postName', value: 'postId', options: 'options' },
      mode: 'multiple',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'email',
      label: 'userManage.email',
      rules: []
    },
    {
      is: input,
      name: 'phonenumber',
      label: 'userManage.phone',
      rules: []
    },
    {
      is: select,
      name: 'roleId',
      label: 'userManage.role',
      options: [],
      fieldNames: { label: 'roleName', value: 'roleId', options: 'options' },
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
  ] as IFormItemType[]
}
