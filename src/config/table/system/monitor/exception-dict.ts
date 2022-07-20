import type { TableColumnsType } from 'ant-design-vue'

export default {
  columns: [
    { title: 'errorDict.errorCode', dataIndex: 'code' },
    { title: 'errorDict.errorInfo', dataIndex: 'msg' }
  ] as TableColumnsType
}
