import type { Slots, VNode } from 'vue'

/**
 * 获取插槽
 *
 * @param {Slots[]} slots slots 数组
 * @param {string} prop 参数key
 * @param {unknown} scope 参数
 * @returns {VNode} slots 虚拟节点
 */
export function getSlot<T>(slots: Slots, prop = 'default', scope?: T): VNode[] | undefined {
  return slots[prop]?.({ scope }) as VNode[] | undefined
}
