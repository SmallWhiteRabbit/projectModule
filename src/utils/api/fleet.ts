import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

/**
 * fleet 导航点
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function fleetMarkers<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/fleet/markers', method: 'get', params: data })
}
/**
 * fleet 导航点 翻页
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function fleetMarkersPage<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/fleet/markers/page', method: 'get', params: data })
}

/**
 * fleet missions
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function fleetMissions<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/fleet/missions', method: 'get', params: data })
}

/**
 * fleet missions 分页
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function fleetMissionsPage<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/fleet/missions/page', method: 'get', params: data })
}
/**
 * fleet 载具
 *
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function fleetVehicles<U>(data?: U): AxiosPromise {
  return request({ url: '/biz/fleet/vehicles', method: 'get', params: data })
}
/**
 * fleet 载具 通过id获取
 *
 *@param {string} id id
 * @param {object} data 数据
 * @returns {AxiosPromise} 函数
 */
export function fleetVehiclesId<U>(id: string, data?: U): AxiosPromise {
  return request({ url: `/biz/fleet/vehicles${id}`, method: 'get', params: data })
}
/**
 *fleet 地图 通过id获取
 *
 * @param {string} id 机器人id
 * @param {object} data 其他参数
 * @returns {AxiosPromise} 函数
 */
export function fleetAGVMaps<U>(id?: string, data?: U): AxiosPromise {
  return request({ url: `/biz/fleet/AGVMaps`, method: 'get', params: data })
}
