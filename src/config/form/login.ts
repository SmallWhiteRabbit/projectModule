export default {
  formData: {
    username: '',
    password: ''
  },

  formListItem: [
    {
      slotName: 'username',
      name: 'username',
      label: 'Login.userName',
      rules: [{ required: true, message: 'Login.noUserName', trigger: 'blur' }]
    },
    {
      slotName: 'password',
      name: 'password',
      label: 'Login.password',
      rules: [{ required: true, message: 'Login.noPassword', trigger: 'blur' }]
    }
  ] as IFormItemType[]
}
