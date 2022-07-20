import type { TableColumnsType } from 'ant-design-vue'
export default {
  columns: [
    { title: 'deviceAccount.name', dataIndex: 'name', width: 200 },
    { title: 'deviceAccount.describe', dataIndex: 'description' },
    { title: 'deviceAccount.model', dataIndex: 'model' },
    { title: 'deviceAccount.manufacturer', dataIndex: 'manufacturer' },
    { title: 'deviceAccount.specification', dataIndex: 'specification' },
    { title: 'deviceAccount.installDate', dataIndex: 'setupTime', align: 180 },
    { title: 'deviceAccount.location', dataIndex: 'factoryZoneName' },
    { title: 'system.options', key: 'options', width: 240, align: 'center' }
  ] as TableColumnsType
}

export interface ITableRow {
  id: string
  name: string
  describe: string
  model: string
  specification: string
  setupTime: string
  manufacturer: string
  description: string
  factoryZoneId: string
  factoryZoneName: string
}
export interface ITableWayPointRow {
  description: string
  deviceId: string
  id: string
  markerCode: string
  markerName: string
  cellCode: string
  prop: object
}
export interface IWayPointProps extends ITableRow {
  list: ITableWayPointRow[]
}
