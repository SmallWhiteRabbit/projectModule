import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/elementGroup/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/biz/elementGroup', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/elementGroup', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/elementGroup/${id}`, method: 'DELETE', data })
}

/**
 * agv列表
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function agvList<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/elementGroup/list', method: 'get', params: data })
}

/**
 * 设备列表
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function deviceList<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/elementGroup/list', method: 'get', params: data })
}
