import type { TableColumnsType } from 'ant-design-vue'

import type { ITableRow as ITableReservoirRow } from './reservoir'
export default {
  columns: [
    { title: 'storageParams.warehouseCode', dataIndex: 'code' },
    { title: 'storageParams.warehouseName', dataIndex: 'name' },
    { title: 'storageParams.location', dataIndex: 'factoryZoneName' }
    // { title: 'system.options', key: 'options', width: 200, align: 'center' }
  ] as TableColumnsType
}

export interface ITableRow {
  id: string
  name: string
  code: string
  factoryZoneId: string
  factoryZoneName: string
  areas?: ITableReservoirRow[]
}
