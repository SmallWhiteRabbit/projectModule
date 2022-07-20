import type { ITableRow } from '@/config/table/system/tool/schedule'
import { input, radioGroup, textarea } from '@/config/form'
import { required_check, required_select } from '@/utils/Form'
export default {
  formData: {
    jobId: '',
    jobName: '',
    invokeTarget: '',
    misfirePolicy: '1',
    concurrent: '0',
    cronExpression: '',
    status: '0',
    remark: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'jobName',
      label: 'schedule.taskName',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'invokeTarget',
      label: 'schedule.callsTarget',
      rules: [required_check()]
    },
    {
      is: radioGroup,
      name: 'misfirePolicy',
      label: 'schedule.planningStrategy',
      radioList: [
        { label: 'schedule.immediateExecution', value: '1' },
        { label: 'schedule.once', value: '2' },
        { label: 'schedule.givePerform', value: '3' }
      ],
      rules: [required_select()]
    },
    {
      is: radioGroup,
      name: 'concurrent',
      label: 'schedule.isConcurrently',
      radioList: [
        { label: 'schedule.allow', value: '0' },
        { label: 'schedule.ban', value: '1' }
      ],
      rules: [required_select()]
    },
    {
      is: input,
      name: 'cronExpression',
      label: 'schedule.cronExecutesExpressions',
      rules: [required_check()]
    },
    {
      is: radioGroup,
      name: 'status',
      label: 'schedule.taskStatus',
      radioList: [
        { label: 'schedule.normal', value: '0' },
        { label: 'schedule.suspend', value: '1' }
      ],
      rules: [required_select()]
    },
    {
      is: textarea,
      name: 'remark',
      label: 'system.remark',
      rules: [required_check()]
    }
  ] as IFormItemType[]
}
