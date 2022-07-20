import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 * 列表
 *
 * @returns {AxiosPromise} 函数
 */
export function list(): AxiosPromise {
  return request({ url: '/CodeEnum/get', method: 'get' })
}
