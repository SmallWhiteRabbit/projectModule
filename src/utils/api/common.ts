import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 * 上传
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function upload<U>(data: U): AxiosPromise {
  return request({ url: '/common/file/upload', method: 'post', data })
}

/**
 * 系统配置
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function systemConfig<U>(data?: U): AxiosPromise {
  return request({ url: '/anonymous/system/config/list/base', method: 'get', params: data })
}
