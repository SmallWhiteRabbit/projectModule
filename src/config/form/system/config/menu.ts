import type { ITableRow } from '@/config/table/system/config/menu'
import { input, radioGroup, treeSelect } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    component: '',
    icon: '',
    menuId: '',
    menuName: '',
    menuType: '1',
    orderNum: '',
    params: {},
    parentId: 0,
    parentName: 'menu.system.main',
    path: '',
    visible: '1'
  } as ITableRow,
  formListItem: [
    {
      is: treeSelect,
      name: 'parentId',
      label: 'menuManage.parentName',
      rules: [required_check()],
      treeList: [] as ITree[]
    },
    {
      is: input,
      name: 'menuName',
      label: 'menuManage.menuName',
      rules: [required_check()],
      disabled: true
    },
    {
      is: radioGroup,
      name: 'menuType',
      label: 'menuManage.menuType',
      radioList: [
        { label: 'menuManage.btn', value: '0' },
        { label: 'menuManage.menu', value: '1' }
      ],
      rules: [required_check()]
    },
    {
      is: input,
      name: 'orderNum',
      label: 'menuManage.orderNum',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'icon',
      label: 'menuManage.icon'
    },
    {
      is: input,
      name: 'path',
      label: 'menuManage.path'
    },
    {
      is: input,
      name: 'component',
      label: 'menuManage.component'
    },
    {
      is: radioGroup,
      name: 'visible',
      label: 'menuManage.visible',
      radioList: [
        { label: 'system.show', value: '0' },
        { label: 'system.hide', value: '1' }
      ]
    }
  ]
}
