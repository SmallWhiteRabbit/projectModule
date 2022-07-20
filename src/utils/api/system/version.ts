import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 * 列表
 *
 * @returns {AxiosPromise} 函数
 */
export function list(): AxiosPromise {
  return request({ url: `/system/version`, method: 'get' })
}

/**
 * 编辑
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function edit<U>(data: U): AxiosPromise {
  return request({ url: '/system/version', method: 'put', data })
}
/**
 * 编辑用户手册地址
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function editUserGuideUrl<U>(data: U): AxiosPromise {
  return request({ url: '/system/version/userGuideUrl', method: 'post', data })
}
