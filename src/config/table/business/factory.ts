import type { TableColumnsType } from 'ant-design-vue'
export interface ITableRow {
  id: string
  name: string
  level: number
  parentId: string
  parentName: string
  fleetMapId: string
  fleetMapName: string
  children?: ITableRow[]
}
export default {
  columns: [
    { title: 'factory.parentName', dataIndex: 'parentName' },
    { title: 'factory.name', dataIndex: 'name' },
    { title: 'factory.level', dataIndex: 'level' },
    { title: 'factory.createTime', dataIndex: 'createTime', width: '180px', align: 'center' },
    { title: 'factory.fleetMapName', dataIndex: 'fleetMapName' },
    { title: 'system.options', key: 'options', width: '200px', align: 'center' }
  ] as TableColumnsType
}
