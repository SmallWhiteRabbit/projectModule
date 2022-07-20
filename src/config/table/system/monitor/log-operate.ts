import type { TableColumnsType } from 'ant-design-vue'

export default {
  columns: [
    { title: 'operateLog.sysModule', dataIndex: 'title', minWidth: '200px' },
    { title: 'operateLog.operateType', key: 'operateType', minWidth: '200px' },
    { title: 'operateLog.operateMemeber', dataIndex: 'operName' },
    { title: 'operateLog.hostIp', dataIndex: 'operIp' },
    { title: 'operateLog.operateAddress', dataIndex: 'operLocation' },
    { title: 'operateLog.operateStatus', key: 'status' },
    { title: 'operateLog.operateTime', dataIndex: 'operTime', minWidth: '200px', align: 'center' },
    { title: 'operateLog.operate', key: 'options', width: '80px' }
  ] as TableColumnsType
}
