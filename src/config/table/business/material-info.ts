import type { TableColumnsType } from 'ant-design-vue'
export interface ITableRow {
  id: string
  name: string
  brand: string
  model: string
  specification: string
  code: string
  amount: number
  manufacturer: string
}

export default {
  columns: [
    { title: 'materialInfo.name', dataIndex: 'name' },
    { title: 'materialInfo.brand', dataIndex: 'brand' },
    { title: 'materialInfo.model', dataIndex: 'model' },
    { title: 'materialInfo.specification', dataIndex: 'specification' },
    { title: 'materialInfo.code', dataIndex: 'code' },
    { title: 'materialInfo.amount', dataIndex: 'amount' },
    { title: 'materialInfo.manufacturer', dataIndex: 'manufacturer' },
    { title: 'system.options', key: 'options', width: 140, align: 'center' }
  ] as TableColumnsType
}
