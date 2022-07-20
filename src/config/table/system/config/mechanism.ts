import type { TableColumnsType } from 'ant-design-vue'

export interface ITableRow {
  deptName: string
  orderNum: string
  parentId: number
  parentName: string
  status: string
  deptId: string
  children?: ITableRow[]
}

export default {
  columns: [
    { title: 'mechanism.deptName', dataIndex: 'deptName', minWidth: 400 },
    { title: 'mechanism.orderNum', dataIndex: 'orderNum' },
    { title: 'mechanism.parentName', dataIndex: 'parentName' },
    { title: 'system.status', key: 'status', width: 80 },
    { title: 'system.createTime', dataIndex: 'createTime', width: 180, align: 'center' },
    { title: 'system.options', key: 'options', width: 180, align: 'center' }
  ] as TableColumnsType
}
