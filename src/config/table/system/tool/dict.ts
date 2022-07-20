import type { TableColumnsType } from 'ant-design-vue'

export default {
  columns: [
    { title: 'dictManage.serial', dataIndex: 'dictSort' },
    { title: 'dictManage.dictionaryKeys', dataIndex: 'dictCode' },
    { title: 'dictManage.dictionaryName', dataIndex: 'dictLabel' },
    { title: 'dictManage.dictionaryType', dataIndex: 'dictType', minWidth: '200px' },
    { title: 'dictManage.dictionaryKeysValue', dataIndex: 'dictValue', minWidth: '200px' },
    { title: 'system.status', key: 'status', width: 80 },
    { title: 'system.remark', dataIndex: 'remark' },
    { title: 'system.createTime', dataIndex: 'createTime', align: 'center', width: 180 },
    { title: 'dictManage.builtIn', key: 'isDefault' },
    { title: 'system.options', key: 'options', width: 140, align: 'center' }
  ] as TableColumnsType
}

export interface ITableRow {
  dictCode: string
  dictLabel: string
  dictType: string
  isDefault: string
  dictValue: string
  status: string
  remark: string
}
