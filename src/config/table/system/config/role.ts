import type { TableColumnsType } from 'ant-design-vue'

export interface ITableRow {
  roleId: string
  roleName: string
  menusIds: string[]
  deptIds: string[]
  status: string
}

export default {
  columns: [
    { title: 'roleManage.roleName', dataIndex: 'roleName' },
    { title: 'roleManage.menuRights', key: 'menuNames', minWidth: '200px' },
    { title: 'roleManage.dataRights', key: 'deptNames', minWidth: '200px' },
    { title: 'system.createTime', dataIndex: 'createTime', align: 'center', width: '180px' },
    { title: 'roleManage.roleName', dataIndex: 'roleName' },
    { title: 'system.options', key: 'options', width: '120px', align: 'center' }
  ] as TableColumnsType
}
