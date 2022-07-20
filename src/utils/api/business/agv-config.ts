import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/agv/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/biz/agv', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/biz/agv', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/agv/${id}`, method: 'DELETE', data })
}

/**
 * 同步fleet agv数据
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function listFleet<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/agv/fleetAgv', method: 'get', params: data })
}
