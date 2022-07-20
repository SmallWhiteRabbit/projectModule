import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
/**
 * 列表
 *
 * @param  {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function list<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/job/list', method: 'get', params: data })
}

/**
 * 新增
 *
 * @param   {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function add<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/job', method: 'post', data })
}
/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/job', method: 'put', data })
}

/**
 * 删除
 *
 * @param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function del<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/monitor/job/${id}`, method: 'DELETE', data })
}
/**
 * 切换状态
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function changeStatus<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/job/changeStatus', method: 'put', data })
}
/**
 * 执行任务
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function jobRun<U>(data: U): AxiosPromise {
  return request({ url: '/monitor/job/run', method: 'put', data })
}
