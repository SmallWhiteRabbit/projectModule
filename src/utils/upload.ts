/**
 * 回调
 *
 * @param {File} file 文件
 */
function fileCallBack(file: File): void {
  console.log(file)
}

/**
 * 点击上传
 *
 * @param {Event} e Event
 * @param {fileCallBack} cb 回调
 * @returns {void}
 */
export function chooseUploadFile(e: Event, cb = fileCallBack): void {
  const { target } = e

  if (target === null) {
    return
  }
  const { files } = target as HTMLInputElement

  if (files === null) {
    return
  }
  const file = files.item(0)

  if (!file) return
  /*
   * 清空，防止上传后再上传没有反应
   * e.target.value = ''
   */
  cb(file)
}
/**
 * 拖拽上传结束
 *
 * @param {Event} e 事件
 */
export function fileDragover(e: Event): void {
  e.preventDefault()
}

/**
 * 拖拽上传
 *
 * @param {DragEvent} e DragEvent
 * @param {fileCallBack} cb 回调
 * @returns {void}
 */
export function fileDrop(e: DragEvent, cb = fileCallBack): void {
  e.preventDefault()
  const { dataTransfer } = e

  if (dataTransfer === null) {
    return
  }
  // 获取到第一个上传的文件对象

  const file = dataTransfer.files[0]

  if (!file) return
  cb(file)
}
