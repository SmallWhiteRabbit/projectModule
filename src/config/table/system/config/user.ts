import type { TableColumnsType } from 'ant-design-vue'

export interface ITableRow {
  postIds: string[]
  email: string
  nickName: string
  phonenumber: string
  roleId: string
  status: string
  userName: string
  userId: string
}
export default {
  columns: [
    { title: 'userManage.account', dataIndex: 'nickName' },
    { title: 'userManage.name', dataIndex: 'userName' },
    { title: 'userManage.mechanism', dataIndex: 'deptName' },
    { title: 'userManage.job', key: 'postNames' },
    { title: 'userManage.email', dataIndex: 'email' },
    { title: 'userManage.phone', dataIndex: 'phonenumber' },
    { title: 'userManage.role', dataIndex: 'roleName' },
    { title: 'system.status', key: 'status' },
    { title: 'system.createTime', dataIndex: 'createTime', align: 'center', width: 180 },
    { title: 'system.options', key: 'options', width: 140, align: 'center' }
  ] as TableColumnsType
}
