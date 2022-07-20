import { inputPassword } from '@/config/form'
import { checkPassWord } from '@/utils/Form'

export default {
  formData: {
    confirmPassword: '',
    oldPassword: '',
    newPassword: ''
  },

  formListItem: [
    {
      is: inputPassword,
      name: 'oldPassword',
      label: 'Login.oldPassword',
      rules: [{ required: true, message: 'message.placeholderErr', trigger: 'blur' }]
    },
    {
      is: inputPassword,
      name: 'newPassword',
      label: 'Login.newPassword',
      rules: [
        { required: true, message: 'message.placeholderErr', trigger: 'blur' },
        { validator: checkPassWord, trigger: 'blur' }
      ]
    },
    {
      is: inputPassword,
      name: 'confirmPassword',
      label: 'Login.confirmPassword',
      rules: [{ required: true, message: 'message.placeholderErr', trigger: 'blur' }]
    }
  ] as IFormItemType[]
}
