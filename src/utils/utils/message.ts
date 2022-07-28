import { message } from 'ant-design-vue'

export type MsgType = 'info' | 'error' | 'warning' | 'success' | undefined
export type MsgContent = {
  iconClass?: string
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  onClose?: () => void
  offset?: number
  appendTo?: string | HTMLElement
  grouping?: boolean
  message?: string
  title?: string
}
class AlertMessage {
  // constructor() {}
  baseMsg(type: MsgType, content: MsgContent): void {
    message.info(content.message)
  }

  success(content: MsgContent): void {
    message.success(content.message)
  }

  warning(content: MsgContent): void {
    message.warning(content.message)
  }

  error(content: MsgContent): void {
    message.error(content.message)
  }
}

export const $msg = new AlertMessage()
