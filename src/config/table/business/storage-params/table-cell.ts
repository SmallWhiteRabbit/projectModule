export interface ITableRow {
  actionCode: string
  attribute: string
  code: string
  deviceId: string
  deviceIotId: string
  deviceIotSignalDescription: string
  deviceIotSignalId: string
  id: string
  markerCode: string
  remark: string
  status: string
  warehouseAreaUnitId: string
}
export default {
  columns: [
    { title: 'storageParams.cellCode', dataIndex: 'code', width: 120 },
    { title: 'storageParams.guide', key: 'markerCode', width: 120 },
    { title: 'storageParams.actionCode', key: 'actionCode', width: 120 },
    { title: 'storageParams.cellSignal', key: 'deviceIotSignalId', width: 180 },
    { title: 'storageParams.cellAttr', key: 'attribute', width: 120 },
    { title: 'storageParams.cellStatus', key: 'status', width: 120 },
    { title: 'storageParams.cellRemark', key: 'remark', width: 120 }
  ]
}
