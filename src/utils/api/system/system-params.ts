import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @returns {AxiosPromise} 函数
 */
export function list(): AxiosPromise {
  return request({ url: '/system/config/list/base', method: 'get' })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/system/config', method: 'put', data })
}
