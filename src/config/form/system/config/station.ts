import type { ITableRow } from '@/config/table/system/config/station'
import { input, radioGroup, selectAdd } from '@/config/form'
import { required_check } from '@/utils/Form'
export default {
  formData: {
    postId: '',
    postName: '',
    postCode: '',
    description: '',
    status: '0',
    typeId: '',
    typeName: ''
  } as ITableRow,
  formListItem: [
    {
      is: input,
      name: 'postCode',
      label: 'station.stationCode',
      rules: [required_check()]
    },
    {
      is: input,
      name: 'postName',
      label: 'station.stationName',
      rules: [required_check()]
    },

    {
      is: selectAdd,
      name: 'typeId',
      label: 'station.stationType',
      options: [],
      fieldNames: { label: 'typeName', value: 'typeId', options: 'options' },
      rules: [required_check()],
      funcAdd: (): void => {}
    },
    {
      is: input,
      name: 'description',
      label: 'station.stationDesc'
    },
    {
      is: radioGroup,
      name: 'status',
      label: 'system.status',
      radioList: [
        { label: 'message.normal', value: '0' },
        { label: 'message.stop', value: '1' }
      ]
    }
  ] as IFilterData[]
}
