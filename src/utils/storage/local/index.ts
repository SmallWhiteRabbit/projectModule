function localDB(name: string): string | null
function localDB(name: string, value: string): void
/**
 * 本地存储
 *
 * @param {string} name key
 * @param {string} value 值
 * @returns {string} 值
 */
function localDB(name: string, value?: string): unknown {
  if (value !== undefined) {
    localStorage.setItem(name, value)
  } else {
    return localStorage.getItem(name)
  }
}

/**
 * 用户信息，固定key: UserLocalData
 *
 * @param {string} value value
 * @returns {string} 值
 */
export const UserLocalData = function (value?: string): unknown {
  if (value !== undefined) {
    localDB('UserLocalData', value)
  } else {
    return localDB('UserLocalData')
  }
}

/**
 *  语言
 *
 *@param {string} value value
 * @returns {string} 值
 */
export const langLocalData = function (value?: string): unknown {
  if (value !== undefined) {
    localDB('langLocalData', value)
  } else {
    return localDB('langLocalData')
  }
}

/**
 *是否自动登录
 *
 *@param {string} value value
 * @returns {string} 值
 */

export const isLoginAutoLocalData = function (value?: string): unknown {
  if (value !== undefined) {
    localDB('isLoginAutoLocalData', value)
  } else {
    return localDB('isLoginAutoLocalData')
  }
}

/**
 *路由
 *
 *@param {string} value value
 * @returns {string} 值
 */

export const routerLocalData = function (value?: string): unknown {
  if (value !== undefined) {
    localDB('routerLocalData', value)
  } else {
    return localDB('routerLocalData')
  }
}
