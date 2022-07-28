import type { TState } from './utils'
import request, { prefix } from './request'
import { deleteConfirm } from './confirm'
import { create_link } from './download'
import { $msg } from './message'
import { getSlot } from './props'
import { chooseUploadFile, fileDragover, fileDrop } from './upload'
import { mixins_extend, fomat_float, rich_text_json, random_word } from './utils'
import { PROTOCOL, DATAFLAG, DATATYPE, UNITTYPE, CELLATTR, CELLSTATUS, EDataType } from './variable'

import {
  checkNumber,
  checkPassWord,
  getPassWordSameFn,
  checkCode,
  checkPhone,
  checkEmail,
  checkIp,
  checkPort,
  required_check,
  get_number_check,
  required_select,
  get_ip_check,
  get_port_check,
  get_phone_check,
  get_code_check,
  get_password_check,
  get_email_check,
  get_length_rule
} from './Form'

export {
  request,
  deleteConfirm,
  create_link,
  $msg,
  prefix,
  getSlot,
  chooseUploadFile,
  fileDragover,
  fileDrop,
  mixins_extend,
  fomat_float,
  rich_text_json,
  random_word,
  PROTOCOL,
  DATAFLAG,
  DATATYPE,
  UNITTYPE,
  CELLATTR,
  CELLSTATUS,
  EDataType,
  required_check,
  get_number_check,
  required_select,
  get_ip_check,
  get_port_check,
  get_phone_check,
  get_code_check,
  get_password_check,
  get_email_check,
  get_length_rule,
  checkNumber,
  checkPassWord,
  getPassWordSameFn,
  checkCode,
  checkPhone,
  checkEmail,
  checkIp,
  checkPort,
  TState
}
