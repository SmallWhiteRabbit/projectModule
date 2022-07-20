import type { TableColumnsType } from 'ant-design-vue'
interface IDevices {
  id: string
  name: string
}
interface IAreaUnits {
  id: string
  code: string
}
interface IAgvs {
  id: string
  fleetAgvId: string
}
export interface ITableRow {
  agvIds: Array<string>
  agvType: string
  areaUnitIds: Array<string>
  description: string
  deviceIds: Array<string>
  factoryZoneId: string
  id: string
  name: string
  priorityEnable: boolean
  remark: string
  devices?: Array<IDevices>
  areaUnits?: Array<IAreaUnits>
  agvs?: Array<IAgvs>
}
export default {
  columns: [
    { title: 'loginLog.serialNumber', key: 'index', width: 88, align: 'center' },
    { title: 'elementGroup.name', dataIndex: 'name' },
    { title: 'elementGroup.descriptors', dataIndex: 'remark' },
    { title: 'elementGroup.position', dataIndex: 'factoryZoneName' },
    { title: 'elementGroup.binding', key: 'deviceIds' },
    { title: 'elementGroup.warehouseBinding', key: 'areaUnitIds', width: 180 },
    { title: 'elementGroup.agvType', dataIndex: 'agvType' },
    { title: 'elementGroup.agvBinding', key: 'agvIds' },
    { title: 'system.options', key: 'options', width: 140, align: 'center' }
  ] as TableColumnsType
}
