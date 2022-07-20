import { treeselect as mechanismTree } from '@/utils/api/system/mechanism'
import { treeselect as factoryTree } from '@/utils/api/business/factory'

export interface IDefaultProps {
  children: string
  label: string
}
export interface ITreeDataType {
  children?: Array<ITreeDataType>
  id: string
  label: string
}
export interface ITreeMenu extends ITreeDataType {
  menuType?: string
}
export interface ITreeFactory extends ITree {
  fleetMapId?: string
}

interface useTreeHooks {
  getMechanismTreeList: (isNeed?: boolean) => Promise<ITree[]>
  getFactoryTreeList: (isNeed?: boolean) => Promise<ITree[]>
}

/**
 * 方法
 *
 * @returns {useTreeHooks} useTree
 */
export default function (): useTreeHooks {
  const getFactoryTreeList = (isNeed?: boolean): Promise<ITree[]> => {
    return factoryTree({}).then(res => {
      const { data } = res
      let list: ITreeFactory[] = []

      if (isNeed && data) {
        list = [
          {
            id: '0',
            label: '主目录'
          }
        ]
        if (data) {
          list.concat(data)
        }
      }
      return list
    })
  }
  const getMechanismTreeList = (isNeed?: boolean): Promise<ITree[]> => {
    return mechanismTree({}).then(res => {
      const { data } = res
      let list: ITreeMenu[] = data

      if (isNeed) {
        list = [
          {
            id: '0',
            label: '主机构'
          }
        ].concat(data)
      }
      return list
    })
  }

  return {
    getMechanismTreeList,
    getFactoryTreeList
  }
}
