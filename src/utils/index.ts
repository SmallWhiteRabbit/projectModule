export const prefix = '/api/v3/'
export type TState = {
  [n: string]: unknown
}
type KState = keyof TState
/**
 *  覆盖原对象属性方法，返回原对象类型
 *
 * @param {TState} baseState 原对象
 * @param {TState} state 新对象
 * @returns {TState} 返回
 */
export function mixins_extend(baseState: TState, state: TState): TState {
  const result = baseState

  for (const key in state) {
    if (Object.prototype.hasOwnProperty.call(result, key) && Object.prototype.hasOwnProperty.call(state, key)) {
      const k = key as KState

      result[k] = state[k]
    }
  }
  return result
}

/**
 * 四舍五入保留n位小数
 *
 * @param {string} str 修改的数字
 * @param {number} n 保留的位数
 * @param {string} returnType 返回类型：0数字，1字符串
 * @param {string} round 四舍五入round，上取整floor，下取整ceil
 * @returns {string} 结果
 */
export function fomat_float(str: string, n: number, returnType = 0, round = 'round'): number | string {
  const num = parseFloat(str)

  if (isNaN(num)) return 'NaN'
  let f

  switch (round) {
    // 上取整
    case 'floor': {
      f = Math.floor(num * Math.pow(10, n)) / Math.pow(10, n)
      break
    }
    // 下取整
    case 'ceil': {
      f = Math.ceil(num * Math.pow(10, n)) / Math.pow(10, n)
      break
    }
    // 四舍五入
    default: {
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
    }
  }
  if (!returnType) return f
  let s = f.toString()
  let rs = s.indexOf('.')
  // 判定如果是整数，增加小数点再补0

  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + n) {
    s += '0'
  }
  return s
}

/**
 * 富文本json
 *
 * @param {object} json json
 * @returns {null | string} 转换结果
 */
export function rich_text_json<T>(json: T): string | null {
  if (!json) {
    return null
  }
  return JSON.stringify(json, undefined, 2)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+))/g, function (match) {
      let color = 'darkorange'

      if (/^"/.test(match)) {
        color = /:$/.test(match) ? 'red' : 'green'
      } else if (/true|false/.test(match)) {
        color = 'blue'
      } else if (/null/.test(match)) {
        color = 'magenta'
      }
      return '<span style="color: ' + color + ';">' + match + '</span>'
    })
}

/**
 * 获取随机位数的字符串
 *
 * @param {boolean} randomFlag true时，输入min，max获取区间内的随机位数；false时，再输入一个变量，获取固定位数的字符串
 * @param {number} min 最小值
 * @param {number} max 最大值
 *  @returns { string} 结果
 */
export function random_word(randomFlag: boolean, min: number, max: number): string {
  let str = ''
  let range = min
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  let pos = 0

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}
