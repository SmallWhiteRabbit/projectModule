import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 *登录
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function login<U>(data: U): AxiosPromise {
  return request({ url: '/login', method: 'post', data })
}

/**
 * 获取用户信息
 *
 * @returns {AxiosPromise} 函数
 */
export function getInfo(): AxiosPromise {
  return request({ url: '/getInfo', method: 'get' })
}

/**
 * 获取路由
 *
 * @returns {AxiosPromise} 函数
 */
export function getRouters(): AxiosPromise {
  return request({ url: '/getRouters', method: 'get' })
}

/**
 * 登出
 *
 *@param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function logout<U>(data?: U): AxiosPromise {
  return request({ url: '/logout', method: 'post', data })
}
