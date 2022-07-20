import type { ITableRow as ITableCellRow } from './table-cell'
export interface ITableRow {
  amount: number
  //后台计算
  availableAmount?: number
  code: string
  id: string
  layoutColumn: number
  layoutLayer: number
  layoutRow: number
  type: string
  warehouseAreaId: string
  cells: Array<ITableCellRow>
}

export default {
  columns: [
    { title: 'storageParams.storageCode', dataIndex: 'code' },
    { title: 'storageParams.storageAmount', dataIndex: 'amount' },
    { title: 'storageParams.storageNum', dataIndex: 'availableAmount', width: 140 },
    { title: 'storageParams.storageModel', dataIndex: 'type' },
    { title: 'storageParams.specification', key: 'specification' },
    { title: 'system.options', key: 'options', width: 200, align: 'center' }
  ]
}
