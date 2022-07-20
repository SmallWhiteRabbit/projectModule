import type { TableColumnsType } from 'ant-design-vue'

export default {
  columns: [
    { title: 'loginLog.loginName', dataIndex: 'userName' },
    { title: 'loginLog.loginAddress', dataIndex: 'ipaddr', minWidth: '200px' },
    { title: 'loginLog.loginAddress', dataIndex: 'loginLocation', minWidth: '200px' },
    { title: 'loginLog.browser', dataIndex: 'browser', align: 'center', width: '180px' },
    { title: 'loginLog.browser', dataIndex: 'os' },
    { title: 'loginLog.loginStatus', key: 'region', width: '120px', align: 'center' },
    { title: 'loginLog.operateInfo', dataIndex: 'msg', width: '120px', align: 'center' },
    { title: 'loginLog.loginTime', dataIndex: 'loginTime', width: 180, align: 'center' },
    { title: 'loginLog.operate', key: 'options', width: 80, align: 'center' }
  ] as TableColumnsType
}
