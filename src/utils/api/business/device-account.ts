import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/deviceBase/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceBase', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceBase', method: 'put', data })
}
/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/deviceBase/${id}`, method: 'DELETE', data })
}
/**
 * 导出
 *
 * @returns {AxiosPromise} 函数
 */
export function exportData(): AxiosPromise {
  return request({ url: '/biz/deviceBase/export', method: 'GET' })
}
/**
 * 导入
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function importData<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceBase/import', method: 'PUT', data })
}
export const templateUrl = '/biz/deviceBase/template'

/**
 * 导航点列表
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function makerlist<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/deviceMarker/list', method: 'get', params: data })
}

/**
 * 新增导航点
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function makerAdd<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceMarker', method: 'post', data })
}

/**
 * 导入导航点
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function importMakerData<U>(data: U): AxiosPromise {
  return request({ url: '/biz/deviceMarker/import', method: 'PUT', data })
}
//导航点模板地址
export const templateUrlMaker = '/biz/deviceMarker/template'
