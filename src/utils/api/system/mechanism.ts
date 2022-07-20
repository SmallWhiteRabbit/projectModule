import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 * 列表
 *
 * @param {object} data 条件
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/system/dept/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/system/dept', method: 'post', data })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/system/dept', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/system/dept/${id}`, method: 'DELETE', data })
}

/**
 * 树状下拉框
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function treeselect<U>(data: U): AxiosPromise {
  return request({ url: '/system/dept/treeselect', method: 'get', data })
}

/**
 * 树
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function tree<U>(data: U): AxiosPromise {
  return request({ url: '/system/dept/tree', method: 'get', params: data })
}
