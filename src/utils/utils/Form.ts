interface IMessage {
  requiredMsg: string
  errMsg: string
}

/**
 * 检测数字输入是否符合规则
 *
 * @param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkNumber<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    //message.placeholder
    return Promise.reject(this.requiredMsg)
  }
  const reg = Number(value)

  if (value && isNaN(reg)) {
    //message.numberErr
    return Promise.reject(this.errMsg)
  }
}

/**
 * 检测密码是否符合规则
 *
 * @param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkPassWord<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    //message.placeholder
    return Promise.reject(this.requiredMsg)
  }
  const reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')

  if (value && !reg.test(value)) {
    //'message.passwordErr'
    return Promise.reject(this.errMsg)
  }
}

/**
 * 检测密码是否符合规则
 *
 * @param {() => boolean} fn 检测密码是否相同的方法
 * @returns {unknown} 错误提示
 */
export function getPassWordSameFn(fn: () => boolean) {
  return function checkPassWordSame(): unknown {
    if (!fn()) {
      return Promise.reject('message.passwordNotSame')
    }
  }
}
/**
 * 检测编号是否符合规则：字母加数字
 *
 *@param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkCode<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    //'message.placeholder'
    return Promise.reject(this.requiredMsg)
  }
  const reg = /[^0-9a-zA-Z]+/g

  if (value && reg.test(value)) {
    //'message.codeFormatErr'
    return Promise.reject(this.errMsg)
  }
}

/**
 * 检测手机输入是否符合规则
 *
 * @param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkPhone<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    return Promise.reject(this.requiredMsg)
  }
  const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/

  if (value && !reg.test(value)) {
    return Promise.reject(this.errMsg)
  } else {
    return Promise.resolve()
  }
}

/**
 * 检测邮箱输入是否符合规则
 *
 * @param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkEmail<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    return Promise.reject(this.requiredMsg)
  } else {
    const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    if (value && !reg.test(value)) {
      return Promise.reject(this.errMsg)
    } else {
      return Promise.resolve()
    }
  }
}

/**
 * 检测ip输入是否符合规则
 *
 * @param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkIp<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    //'message.placeholder'
    return Promise.reject(this.requiredMsg)
  }
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

  if (value && !reg.test(value)) {
    //message.ipFormatErr
    return Promise.reject(this.errMsg)
  } else {
    return Promise.resolve()
  }
}

/**
 * 检测port输入是否符合规则
 *
 * @param {IMessage} this this
 * @param {Array} rule 规则
 * @param {string} value 内容
 * @returns {unknown} 错误提示
 */
export function checkPort<T>(this: IMessage, rule: T[], value: string): unknown {
  if (!value) {
    return Promise.reject(this.requiredMsg)
  }
  const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

  if (value && !reg.test(value)) {
    //'message.portFormatErr'
    return Promise.reject(this.errMsg)
  }
}

/**
 * 必须有值校验
 *
 * @returns {object} 必须有值校验规则
 */
export function required_check(): IRules {
  return { trigger: 'blur', required: true, message: 'message.placeholder' }
}

/**
 * 必须选择校验
 *
 * @returns {object} 必须选择校验规则
 */
export function required_select(): IRules {
  return { trigger: 'change', required: true, message: 'message.selectPlaceholder' }
}

/**
 * 数字校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {object}数字校验规则
 */
export function get_number_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkNumber.bind({ requiredMsg, errMsg })
  }
}

/**
 * ip校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {unknown}ip校验规则
 */
export function get_ip_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkIp.bind({ requiredMsg, errMsg })
  }
}
/**
 * port校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {unknown} port校验规则
 */
export function get_port_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkPort.bind({ requiredMsg, errMsg })
  }
}

/**
 * 手机校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {unknown} 手机校验规则
 */
export function get_phone_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkPhone.bind({ requiredMsg, errMsg })
  }
}
/**
 * 编码校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {unknown}编码校验规则
 */
export function get_code_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkCode.bind({ requiredMsg, errMsg })
  }
}
/**
 * 密码校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {unknown} 密码校验规则
 */
export function get_password_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkPassWord.bind({ requiredMsg, errMsg })
  }
}
/**
 * 邮箱校验
 *
 * @param {string} requiredMsg 必填
 * @param {string} errMsg 错误
 * @returns {unknown}邮箱校验规则
 */
export function get_email_check(requiredMsg: string, errMsg: string): IRules {
  return {
    required: true,
    trigger: 'blur',
    validator: checkEmail.bind({ requiredMsg, errMsg })
  }
}

/**
 * 长度校验
 *
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {unknown} 校验规则项
 */
export function get_length_rule(min: number, max: number): IRules {
  const pattern = new RegExp(`(^.{${min},${max}}$)`)
  const message = 'message.lengthLimit'
  const afterMessage = `${min}~${max}`

  return {
    pattern,
    message,
    afterMessage,
    trigger: 'blur'
  }
}
