import type { TableColumnsType } from 'ant-design-vue'

export interface ITableRow {
  id: string
  deviceName: string
  deviceId: string
  deviceDescription: string
  controlModel: string
  ipAddress: string
  macAddress: string
  port: string
  protocol: string
}

export interface ITableDataListRow {
  id: string
  signalCode: string
  dataType: string
  dataFlag: string

  prop: object
  deviceId: string
  deviceIotId: string
  signalDescription: string
}

export interface IDataListProps extends ITableRow {
  list: ITableDataListRow[]
}
export default {
  columns: [
    { title: 'IOTParams.name', dataIndex: 'deviceName', width: 200 },
    { title: 'IOTParams.describe', dataIndex: 'deviceDescription' },
    { title: 'IOTParams.model', dataIndex: 'controlModel' },
    { title: 'IOTParams.macUrl', dataIndex: 'macAddress' },
    { title: 'IOTParams.ip', dataIndex: 'ipAddress' },
    { title: 'IOTParams.port', dataIndex: 'port', align: 180 },
    { title: 'IOTParams.agreement', dataIndex: 'protocol' },
    { title: 'system.options', key: 'options', width: 220, align: 'center' }
  ] as TableColumnsType
}
