import { Modal } from 'ant-design-vue'
type successFunc = () => void
type errorFunc = () => void
/**
 *
 * @param {string} message 提示内容
 * @param {string} title 标题
 * @param {string} okText 确定按钮
 * @param {string} cancelText 取消按钮
 * @param {Function} success 确认按钮回调
 * @param {Function} error //取消按钮回调
 */
export function deleteConfirm(
  message: string,
  title: string,
  okText: string,
  cancelText: string,
  success: successFunc,
  error?: errorFunc
): void {
  Modal.confirm({
    title,
    content: message,
    okText,
    cancelText,
    centered: true,
    onCancel: error,
    onOk: success,
    closable: true,
    class: 'my_modal_confirm'
  })
}
