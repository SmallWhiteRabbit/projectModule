function sessionDB(name: string): string | null
function sessionDB(name: string, value: string): void
/**
 * sessionDB
 *
 * @param {string} name id
 * @param {string} value 值
 * @returns {string}  值
 */
function sessionDB(name: string, value?: string): void | string | null {
  if (value !== undefined) {
    sessionStorage.setItem(name, value)
  } else {
    return sessionStorage.getItem(name)
  }
}
/*
 * 例子： 测试
 * 所用使用sessionStorage的数据抛出一个方法 传参即获取，不传即创建
 * ---------------------------------------------------------------------------------------------
 */
export function testDB(id: string, value: string): void
export function testDB(id: string): string | null
/**
 * test
 *
 * @param {string} id id
 * @param {string} value 值
 * @returns {string}  值
 */
export function testDB(id: string, value?: string): void | string | null {
  if (value !== undefined) {
    sessionDB(`test-${id}`, value)
  } else {
    return sessionDB(`test-${id}`)
  }
}
