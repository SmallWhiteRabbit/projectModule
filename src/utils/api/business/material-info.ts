import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/biz/material/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/biz/material', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/material', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/material/${id}`, method: 'DELETE', data })
}

/**
 * 导出
 *
 * @returns {AxiosPromise} 函数
 */
export function exportTemplate(): AxiosPromise {
  return request({ url: '/biz/material/export', method: 'get' })
}
/**
 * 导入
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function importData<U>(data: U): AxiosPromise {
  return request({ url: '/biz/material/import', method: 'PUT', data })
}
export const materialInfoTemplate = '/biz/material/template'
