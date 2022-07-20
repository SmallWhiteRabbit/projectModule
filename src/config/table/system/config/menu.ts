import type { TableColumnsType } from 'ant-design-vue'

export interface ITreeMenu {
  menuType?: string
  children?: Array<ITreeMenu>
  id: string
  label: string
}
export interface ITableRow {
  component: string
  icon: string
  menuId: string
  menuName: string
  menuType: string
  orderNum: string
  parentId: number
  parentName: string
  path: string
  visible: string
  children?: ITableRow[]
  hasChildren?: boolean
}
export default {
  columns: [
    { title: 'menuManage.menuName', key: 'menuName' },
    { title: 'menuManage.url', dataIndex: 'path', minWidth: '200px' },
    { title: 'menuManage.menuType', key: 'menuType', minWidth: '200px' },
    { title: 'menuManage.orderNum', dataIndex: 'orderNum', minWidth: '200px' },
    { title: 'menuManage.parentName', key: 'parentName', minWidth: '200px' },
    { title: 'menuManage.visible', key: 'visible', minWidth: '200px' },
    { title: 'system.options', key: 'options', width: '120px', align: 'center' }
  ] as TableColumnsType
}
