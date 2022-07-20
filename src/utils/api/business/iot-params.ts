import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceIot/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceIot', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceIot', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/deviceIot/${id}`, method: 'DELETE', data })
}
/**
 * 导出
 *
 * @returns {AxiosPromise} 函数
 */
export function exports(): AxiosPromise {
  return request({ url: '/biz/deviceIot/export', method: 'post' })
}

/**
 * 信号列表
 *
 *@param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function signallist<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/deviceIotSignal/list', method: 'get', params: data })
}
/**
 * 新增信号
 *
 *@param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function signalAdd<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceIotSignal', method: 'post', data })
}

/**
 * 导入信号
 *
 *@param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function importSignalData<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceIotSignal/import', method: 'PUT', data })
}
//导入模板
export const templateUrlSignal = '/biz/deviceIotSignal/template'
