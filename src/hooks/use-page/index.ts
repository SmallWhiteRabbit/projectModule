import type { TState } from '@/utils/index'
import type { AxiosPromise } from 'axios'
import type { PaginationProps } from 'ant-design-vue'
import { reactive } from 'vue'
import { mixins_extend } from '@/utils/index'
import { deleteConfirm } from '@/utils/confirm'
import { message } from 'ant-design-vue'

interface IPageParams {
  getData?: () => void
  getPageFn?: <T>(params?: T) => AxiosPromise
  deleteFn?: <T>(id: string, params?: T) => AxiosPromise
}
interface IPageState<T, F> {
  pagination: PaginationProps
  isLoading: boolean
  tableData: T[]
  filterData: F
}

interface usePageHooks<T, F> {
  pageState: IPageState<T, F>
  changePage: (val: number) => void
  getData: () => void
  changeFilter: (data: F) => void
  deleteItemConfirm: (
    id: string,
    title: string,
    tips: string,
    okText: string,
    cancelText: string,
    param?: object,
    succcessTips?: string
  ) => void
  changePageSize: (current: number, pageSize: number) => void
}
/**
 * @param {IPageParams} params 参数
 * @param {TState} state 所有变量
 * @returns {usePageHooks} 返回值
 */
export default function <T, F extends object>(params: IPageParams, state?: TState): usePageHooks<T, F> {
  const ret = {
    pagination: {
      total: 0,
      pagerCount: 20,
      current: 1,
      pageSize: 20,
      pageSizeOptions: [20, 30, 50, 100],
      defaultPageSize: 20,
      showSizeChanger: true,
      size: undefined,
      showTotal: (total: number) => `共 ${total} 条数据`,
      onShowSizeChange: (current: number, pageSize: number): void => {
        console.log(current, pageSize)
      },
      sort: 'create_time desc',
      showQuickJumper: true,
      onChange: (pageNumber: number): void => {
        console.log(pageNumber)
      }
    },
    isLoading: false,
    tableData: [] as T[],
    filterData: {} as F
  }

  type Tpage = typeof ret
  const pageState = (state ? reactive(mixins_extend(ret, state)) : reactive(ret)) as Tpage

  /**
   *获取数据
   */
  function baseFn(): void {
    if (pageState.isLoading) {
      return
    }
    pageState.isLoading = true
    params
      .getPageFn?.({
        pageNum: pageState.pagination.current,
        pageSize: pageState.pagination.pageSize,
        // sort: pageState.sort,
        ...pageState.filterData
      })
      .then(({ data }) => {
        const { rows, total } = data

        pageState.isLoading = false
        pageState.tableData = rows
        pageState.pagination.total = total
      })
      .finally(() => {
        pageState.isLoading = false
      })
  }
  const getData = params.getData ? params.getData : baseFn

  /**
   * 翻页
   *
   * @param {number} val current
   */
  function changePage(val: number): void {
    if (val === null) {
      return
    }
    pageState.pagination.current = val
    getData()
  }

  /**
   * pageSize改变
   *
   * @param {number}  current 当前页
   * @param {number}  pageSize 每页数量
   */
  function changePageSize(current: number, pageSize: number): void {
    if (pageSize === null) {
      return
    }
    pageState.pagination.pageSize = pageSize
    pageState.pagination.current = current
    getData()
  }

  /**
   * 跳转函数
   *
   * @param {number} pageNumber 跳转页
   */
  function changeQuickJumper(pageNumber: number): void {
    if (pageNumber === null) {
      return
    }
    pageState.pagination.current = pageNumber
    getData()
  }
  /**
   * 搜索函数
   *
   * @param {object} data 筛选条件
   */
  function changeFilter(data: F): void {
    pageState.filterData = data
    getData()
  }

  /**
   * 删除弹窗
   *
   * @param {string} id id
   * @param {string} title 名称
   * @param {string} tips 提示
   * @param {string} okText 提交按钮
   * @param {string} cancelText 取消按钮
   * @param {object} param  参数
   * @param {string} succcessTips 成功提示
   */
  function deleteItemConfirm(
    id: string,
    title: string,
    tips: string,
    okText: string,
    cancelText: string,
    param?: object,
    succcessTips?: string
  ): void {
    deleteConfirm(title, tips, okText, cancelText, () => {
      params.deleteFn?.(id, param).then(() => {
        message.success(succcessTips)
        getData()
      })
    })
  }

  pageState.pagination.onShowSizeChange = changePageSize
  pageState.pagination.onChange = changeQuickJumper

  return {
    pageState,
    changePage,
    getData,
    changeFilter,
    deleteItemConfirm,
    changePageSize
  }
}
