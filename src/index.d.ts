interface IConfig {
  url: string
  commit: string
  branch: string
  version: string
}
interface Window {
  config: IConfig
}

interface ISelectOptions {
  label: string
  value?: string
  id?: string
}

interface IFleetMaker {
  agvMapId: string
  code: string
}

interface IFleetAGV {
  id: string
  name: string
}

type TRadio = {
  label: string
  value: string | number
}
interface ITree {
  children?: ITree[]
  label: string
  id: string
}
interface IRules {
  message?: string
  required?: boolean
  trigger: string
  validator?: (rule: IRules[], value: string) => unknown
  pattern?: RegExp
  afterMessage?: string
}

interface IFormItemType {
  prop?: string
  rules?: Array<IRules>
  label: string
  name: string
  is: string
  type?: string
  placeholder?: string
  radioList?: TRadio[]
  treeList?: ITree[]
  multiple?: boolean
  showCheckedStrategy?: string
  treeCheckable?: boolean
  fieldNames?: Object
  options?: Array<any>
  slotName?: string
  disabled?: boolean
  mode?: string
  funcAdd: Function
}

interface IFilterData {
  is: string //表格类型
  name: string //字段名称
  placeholder?: string
  label?: string // 标题
  value?: never //默认值
  options?: Array<any>
  funcAdd?: (val: string) => void
  rules?: Array<unknown>
}

interface ITableOption {
  label: string
  clickFunc: Function
}
