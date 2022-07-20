import type { ITableRow, IDataListProps } from '@/config/table/business/device-params/iot-params'
import { input, select } from '@/config/form'
import { required_check, get_ip_check, get_port_check } from '@/utils/Form'
export default {
  formListItem: [
    {
      is: select,
      name: 'deviceId',
      label: 'IOTParams.name',
      options: [],
      fieldNames: { label: 'name', value: 'id', options: 'options' },
      rules: [required_check()]
    },
    {
      is: input,
      name: 'deviceDescription',
      label: 'IOTParams.describe',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'controlModel',
      label: 'IOTParams.model',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'macAddress',
      label: 'IOTParams.macUrl',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'ipAddress',
      label: 'IOTParams.ip',
      rules: [get_ip_check()]
    },
    {
      is: input,
      name: 'port',
      label: 'IOTParams.port',
      rules: [get_port_check()]
    },
    {
      is: select,
      name: 'protocol',
      label: 'IOTParams.agreement',
      options: [],
      rules: [required_check()]
    }
  ] as IFormItemType[],
  formData: {
    controlModel: '',
    deviceDescription: '',
    deviceId: '',
    deviceName: '',
    id: '',
    ipAddress: '',
    macAddress: '',
    port: '',
    protocol: ''
  } as ITableRow,
  formDataList: {
    deviceName: '',
    deviceDescription: '',
    ipAddress: '',
    macAddress: '',
    list: [],
    deviceId: '',
    id: '',
    controlModel: '',
    port: '',
    protocol: ''
  } as IDataListProps
}
