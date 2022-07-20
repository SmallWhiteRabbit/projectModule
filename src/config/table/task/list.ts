import type { TableColumnsType } from 'ant-design-vue'
export default {
  columns: [
    { title: '项目名称', dataIndex: 'taskName' },
    { title: '状态', dataIndex: 'status' },
    { title: '管理员', dataIndex: 'manager' },
    { title: '项目名称', dataIndex: 'entryName' },
    { title: '项目时间', dataIndex: 'entryTime' }
  ] as TableColumnsType,
  optionsList: [
    {
      label: 'system.edit',
      clickFunc: (): void => {}
    }
  ]
}
