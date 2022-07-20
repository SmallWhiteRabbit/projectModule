import type { TableColumnsType } from 'ant-design-vue'

export default {
  columns: [
    { title: 'systemTool.parameter.primarykey', dataIndex: 'configId' },
    { title: 'systemTool.parameter.parameterName', dataIndex: 'configName' },
    { title: 'systemTool.parameter.parametersKeyName', dataIndex: 'configKey' },
    { title: 'systemTool.parameter.parametersKeyValue', dataIndex: 'configValue', minWidth: 300 },
    { title: 'systemTool.parameter.builtIn', key: 'configType' },
    { title: 'systemTool.parameter.note', dataIndex: 'remark' },
    { title: 'system.createTime', dataIndex: 'createTime', align: 'center', width: 180 },
    { title: 'system.options', key: 'options', width: 140, align: 'center' }
  ] as TableColumnsType
}

export interface ITableRow {
  configId: string
  configName: string
  configKey: string
  configType: string
  configValue: string
  remark: string
}
