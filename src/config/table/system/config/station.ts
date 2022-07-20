import type { TableColumnsType } from 'ant-design-vue'

export interface ITableRow {
  postId: string
  postName: string
  postCode: string
  description: string
  status: string
  typeId: string
  typeName: string
}

export interface ITypeName {
  typeName: string
  typeId: string
}
export default {
  columns: [
    { title: 'station.stationCode', dataIndex: 'postCode' },
    { title: 'station.stationName', dataIndex: 'postName' },
    { title: 'station.stationType', dataIndex: 'typeName' },
    { title: 'station.stationDesc', dataIndex: 'description' },
    { title: 'system.status', key: 'status', width: 80 },
    { title: 'system.createTime', dataIndex: 'createTime', width: 180, align: 'center' },
    { title: 'system.options', key: 'options', width: 180, align: 'center' }
  ] as TableColumnsType
}
