import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 * 仓库
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function tree<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/warehouse/tree', method: 'get', params: data })
}

/**
 * 仓库新增
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function warehouseAdd<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/warehouse', method: 'post', data })
}

/**
 * 仓库编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function warehouseEdit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/warehouse', method: 'put', data })
}
/**
 * 仓库删除
 *
 * @param {string }id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function warehouseDel<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/warehouse/${id}`, method: 'DELETE', data })
}

/**
 * 库区新增
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function areaAdd<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/warehouseArea', method: 'post', data })
}
/**
 * 库区删除
 *
 * @param {string }id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function areaDel<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/warehouseArea/${id}`, method: 'DELETE', data })
}

/**
 * 库区编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function areaEdit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/warehouseArea', method: 'put', data })
}
/**
 * 储区列表
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function unitList<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/warehouseAreaUnit/list', method: 'get', params: data })
}
/**
 * 储区新增
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function unitAdd<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/warehouseAreaUnit', method: 'post', data })
}

/**
 * 储区编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function unitEdit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/warehouseAreaUnit', method: 'put', data })
}
/**
 * 储区删除
 *
 * @param {string }id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function unitDel<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/warehouseAreaUnit/${id}`, method: 'DELETE', data })
}

/**
 * 储位列表
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function cellList<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/warehouseAreaUnitCell/list', method: 'get', params: data })
}
