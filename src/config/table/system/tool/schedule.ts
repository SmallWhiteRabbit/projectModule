import type { TableColumnsType } from 'ant-design-vue'

export default {
  columns: [
    { title: 'schedule.taskNumber', dataIndex: 'jobId', width: 120 },
    { title: 'schedule.taskName', dataIndex: 'jobName' },
    { title: 'schedule.taskGroup', dataIndex: 'jobGroup' },
    { title: 'schedule.callingTargetString', dataIndex: 'invokeTarget', minWidth: 300 },
    { title: 'schedule.executeExpression', dataIndex: 'cronExpression' },
    { title: 'schedule.nextExecutionTime', dataIndex: 'nextValidTime', width: 180, align: 'center' },
    { title: 'schedule.taskStatus', key: 'status', align: 'center', width: 120 },
    { title: 'system.createTime', dataIndex: 'createTime', align: 'center', width: 180 },
    { title: 'system.options', key: 'options', width: 200, align: 'center' }
  ] as TableColumnsType
}

export interface ITableRow {
  jobId: string
  jobName: string
  invokeTarget: string
  misfirePolicy: string
  concurrent: string
  cronExpression: string
  status: string
  remark: string
}
