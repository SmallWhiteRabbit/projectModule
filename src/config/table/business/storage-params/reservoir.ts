import type { ITableRow as ITableStorageRow } from './storage'
export interface ITableRow {
  id: string
  name: string
  code: string
  warehouseId: string
  children?: ITableStorageRow[]
}
export default {
  columns: [
    { title: 'storageParams.reservoirCode', dataIndex: 'code' },
    { title: 'storageParams.reservoirName', dataIndex: 'name' },
    { title: 'system.options', key: 'options', width: 200, align: 'center' }
  ]
}
