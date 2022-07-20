import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param  {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/operlog/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/system/user', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/system/user', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/monitor/operlog/${id}`, method: 'DELETE', data })
}
