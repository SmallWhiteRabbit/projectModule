import type { TableColumnsType } from 'ant-design-vue'
export interface ITableRow {
  id: string
  type: string
  model: string
  specification: string
  code: string
  bottomCode: string
  manufacturer: string
}
export default {
  columns: [
    { title: 'vehicleInfo.type', dataIndex: 'type' },
    { title: 'vehicleInfo.model', dataIndex: 'model' },
    { title: 'vehicleInfo.specification', dataIndex: 'specification' },
    { title: 'vehicleInfo.code', dataIndex: 'code' },
    { title: 'vehicleInfo.bottomCode', dataIndex: 'bottomCode' },
    { title: 'vehicleInfo.manufacturer', dataIndex: 'manufacturer' }
  ] as TableColumnsType
}
