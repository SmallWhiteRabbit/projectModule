import type { AxiosRequestConfig, AxiosPromise } from 'axios'
import axios from 'axios'
import { $msg } from '@/utils/utils/message'

import { toLogin } from '@/Router'

const baseURL = '//' + window.config.url

export const prefix = '/api'
const timeout = 50000
const requestBase = axios.create({
  baseURL,
  timeout,
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Credentials': true
  }
})

requestBase.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
requestBase.interceptors.response.use(
  response => {
    const { code, msg } = response.data

    if (code !== 200) {
      if (code === 401) {
        toLogin()
      }
      $msg.error({ message: msg })
      return Promise.reject(response)
    }

    return Promise.resolve(response.data)
  },
  error => {
    $msg.error({ message: 'request error' + error })
    return Promise.reject(error)
  }
)

/**
 * 公共request方法
 *
 * @param {AxiosRequestConfig} Config 配置
 * @returns {AxiosPromise} 返回值
 */
function request(Config: AxiosRequestConfig): AxiosPromise {
  requestBase.defaults.baseURL = Config.baseURL ? Config.baseURL : baseURL
  Config.url = `${prefix}${Config.url}`
  return requestBase(Config)
}

export default request
