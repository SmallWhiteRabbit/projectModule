import type { TableColumnsType } from 'ant-design-vue'
export default {
  columns: [
    { title: 'loginLog.serialNumber', key: 'index', width: 85 },
    { title: 'AgvConfig.agvNum', dataIndex: 'fleetAgvId', width: 180 },
    { title: 'AgvConfig.model', dataIndex: 'model' },
    { title: 'AgvConfig.BoxType', dataIndex: 'boxModel' },
    { title: 'AgvConfig.bosNum', dataIndex: 'boxAmount' },
    { title: 'AgvConfig.ipAred', dataIndex: 'ipAddress', width: 120 },
    { title: 'AgvConfig.agvPosition', dataIndex: 'factoryZoneName' },
    { title: 'AgvConfig.remarks', dataIndex: 'remark' }
    // { title: 'system.options', key: 'options', width: '120px', align: 'center' }
  ] as TableColumnsType
}

export interface ITableRow {
  id: string
  boxModel: string
  boxAmount: string
  remark: string
  factoryZoneId: string
}
