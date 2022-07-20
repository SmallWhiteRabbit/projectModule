import { prefix } from './request'
/**
 * 下载
 *
 * @param {string} url 下载地址
 */
export function create_link(url: string): void {
  const elink = document.createElement('a')

  elink.style.display = 'none'
  elink.href = prefix + url
  elink.click()
  URL.revokeObjectURL(elink.href)
}
