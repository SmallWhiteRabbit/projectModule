import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param  {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data?: U): AxiosPromise {
  return request({ url: '/system/post/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/system/post', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/system/post', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/system/post/${id}`, method: 'DELETE', data })
}

/**
 * 类型列表
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function listClass<U>(data?: U): AxiosPromise {
  return request({ url: '/system/post/type/list', method: 'get', params: data })
}
/**
 * 新增类型
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function addClass<U>(data: U): AxiosPromise {
  return request({ url: '/system/post/type', method: 'post', data })
}
