import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/biz/carrier/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/biz/carrier', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/carrier', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/carrier/${id}`, method: 'DELETE', data })
}

/**
 * 导出
 *
 * @returns {AxiosPromise} 函数
 */
export function exportTemplate(): AxiosPromise {
  return request({ url: '/biz/carrier/export', method: 'get' })
}
export const vehicleInfoTemplate = '/biz/carrier/template'

/**
 * 导入
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function importData<U>(data: U): AxiosPromise {
  return request({ url: '/biz/carrier/import', method: 'PUT', data })
}
