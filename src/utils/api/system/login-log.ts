import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/loginLog/list', method: 'get', params: data })
}

/**
 * 导出
 *
 * @returns {AxiosPromise} 函数
 */
export function exports(): AxiosPromise {
  return request({ url: '/monitor/loginLog/export', method: 'post' })
}

/**
 * 删除所有
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function delAll<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/loginLog/clean', method: 'DELETE', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: U): AxiosPromise {
  return request({ url: `/monitor/loginLog/${id}`, method: 'DELETE' })
}
