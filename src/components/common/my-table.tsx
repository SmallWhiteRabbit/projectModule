import type { TableColumnsType, TableColumnType } from 'ant-design-vue'
import type { PropType, VNode } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { deepClone, useLocale } from 'youibot-plus'
import { EllipsisOutlined, RightOutlined } from '@ant-design/icons-vue'
import { getSlot } from '@/utils/utils'
interface ISlotType {
  [key: string]: object
}
interface ITableScope {
  column: TableColumnType
  text: Object
}

interface TableRowSelection {
  selectedRowKeys?: (string | number)[]
  onSelect: (record: {}, selected: boolean, selectedRows: []) => void
  onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => void
  onSelectAll: (selected: boolean, selectedRows: [], changeRows: []) => void
}
export default defineComponent({
  name: 'MyTable',
  components: {
    EllipsisOutlined,
    RightOutlined
  },
  props: {
    data: Array,
    columns: {
      type: Array as PropType<TableColumnsType>,
      default() {
        return []
      }
    },
    hasBtn: {
      type: Boolean,
      default: true
    },
    optionsList: {
      type: Array as PropType<ITableOption[]>,
      default() {
        return []
      }
    },
    //是否有选择框
    isSelect: {
      type: Boolean,
      default: false
    },
    // 选中的字段数组
    selectedRowKeys: {
      type: Array as PropType<(string | number)[]>,
      default() {
        return []
      }
    }
  },
  emits: ['onChange', 'select', 'selectAll'],
  setup(props, { slots, attrs, emit }) {
    const { t } = useLocale()
    const height = ref(0)

    /**
     * columns二次处理:多语言转换、操作栏显示控制
     *
     * @returns {TableColumnType} 数组
     */
    function translate_columns(): TableColumnType[] {
      const columns: TableColumnType[] = deepClone(props.columns)
      const columnsLen = columns?.length || 0
      const optionsLen = props.optionsList.length

      if (optionsLen > 0 && columnsLen > 0) {
        const optionObj = {
          align: 'center',
          key: 'options',
          title: t('system.options'),
          width: 160,
          fixed: 'right'
        } as TableColumnType

        if (optionsLen === 1) {
          optionObj.width = 100
        }
        if (props.columns) {
          let isExit = false

          props.columns.forEach((column: TableColumnType) => {
            const { key } = column

            if (key === 'options') {
              isExit = true
              return
            }
          })
          if (!isExit) {
            columns?.push(optionObj)
          }
        }
      }
      props.columns.forEach((item, index) => {
        if (typeof item.title === 'string') {
          columns[index].title = t(item.title)
        }
      })
      return columns
    }

    /**
     * 渲染操作栏
     *
     * @param {ITableScope} scope scope
     * @returns {JSX.Element} JSX.Element
     */
    function render_options(scope: ITableScope): JSX.Element {
      const key = scope.column.key
      const text = scope.text
      const optionsLen = props.optionsList.length

      if (optionsLen <= 2 && optionsLen > 0) {
        return (
          <div class="my-table-options">
            {props.optionsList.map((option: ITableOption) => {
              return (
                <a-button
                  type="text"
                  onClick={(): void => {
                    option.clickFunc(text)
                  }}>
                  {t(option.label)}
                </a-button>
              )
            })}
          </div>
        )
      } else if (optionsLen > 2) {
        const options = props.optionsList.slice(1)
        const content = (
          <ul>
            {options.map(option => {
              return (
                <li
                  onClick={(): void => {
                    option.clickFunc(text)
                  }}>
                  <span> {t(option.label)}</span>
                  <RightOutlined />
                </li>
              )
            })}
          </ul>
        )

        return (
          <div class="my-table-options">
            <a-button
              type="text"
              onClick={(): void => {
                props.optionsList[0].clickFunc(text)
              }}>
              {t(props.optionsList[0].label)}
            </a-button>

            <a-popover placement="bottomRight" trigger="hover" content={content} overlayClassName="table_options_ul">
              <a-badge>
                <a-button type="text">
                  <ellipsis-outlined />
                </a-button>
              </a-badge>
            </a-popover>
          </div>
        )
      } else if (key) {
        return <div class="my-table-options">{slots[key]!({ scope })}</div>
      }
      return <div class="my-table-options"></div>
    }

    /**
     * 渲染slots模块
     *
     * @returns {ISlotType} slots 自定义模块
     */
    function render_slots(): ISlotType {
      const drawerSlots: ISlotType = {}

      // 默认展开模块
      if (slots['expandedRowRender']) {
        drawerSlots['expandedRowRender'] = (scope: ITableScope): VNode[] | undefined => {
          return getSlot(slots, 'expandedRowRender', scope)
        }
      }
      if (slots['bodyCell']) {
        drawerSlots['bodyCell'] = (scope: ITableScope): VNode[] | undefined => {
          return getSlot(slots, 'bodyCell', scope)
        }
      } else {
        drawerSlots['bodyCell'] = (scope: ITableScope): VNode[] | undefined | JSX.Element => {
          const key = scope.column.key

          if (key) {
            if (key === 'options') {
              return render_options(scope)
            } else {
              //自定义模块
              return getSlot(slots, key as string, scope)
            }
          } else {
            return <div>{scope.text}</div>
          }
        }
      }
      return drawerSlots
    }

    /**
     * table 滚动条高度计算
     *
     *  @returns {number} 返回值
     */
    function set_table_height(): number {
      const contentM = document.getElementsByClassName('content-module')
      //56= content-module的padding-top+padding-bottom
      const contentH = contentM[0].clientHeight - 54
      let searchH = 0
      const searchM = document.getElementsByClassName('filter')

      if (searchM && searchM.length > 0) {
        searchH = searchM[0].clientHeight
      }
      let tableHeaderH = 0
      const tableHeaderM = document.getElementsByClassName('ant-table-header')

      if (tableHeaderM && tableHeaderM.length > 0) {
        tableHeaderH = tableHeaderM[0].clientHeight
      }

      let tablePageH = props.hasBtn ? 64 : 0
      const tablePageM = document.getElementsByClassName('ant-table-pagination')

      if (tablePageM && tablePageM.length > 0) {
        tablePageH = tablePageM[0].clientHeight + 32
      }
      const h = contentH - searchH - tableHeaderH - tablePageH - 24

      return h
    }

    //row-selection 的change事件
    const onChange = (selectedRowKeys: (string | number)[], selectedRows: []): void => {
      emit('onChange', selectedRowKeys, selectedRows)
    }
    //row-selection 的select事件
    const onSelect = (record: {}, selected: boolean, selectedRows: []): void => {
      emit('select', record, selected, selectedRows)
    }
    //row-selection 的SelectAll事件
    const onSelectAll = (selected: boolean, selectedRows: [], changeRows: []): void => {
      emit('selectAll', selected, selectedRows, changeRows)
    }

    /**
     * 渲染rowselect
     *
     * @returns {TableRowSelection} 配置项
     */
    function render_row_selection(): TableRowSelection | null {
      if (props.isSelect) {
        return {
          selectedRowKeys: props.selectedRowKeys ? props.selectedRowKeys : [],
          onSelect,
          onChange,
          onSelectAll
        }
      } else {
        return null
      }
    }
    onMounted(() => {
      height.value = set_table_height()
    })
    window.onresize = (): void => {
      height.value = set_table_height()
    }

    return (): JSX.Element => {
      return (
        <a-table
          class="my-table"
          row-selection={render_row_selection()}
          columns={translate_columns()}
          data-source={props.data}
          scroll={{ y: height.value, x: 1000 }}
          row-class-name={(_record: Object, index: number): string | null => (index % 2 === 0 ? 'table-striped' : null)}
          size={'small'}
          {...attrs}
          v-slots={render_slots()}></a-table>
      )
    }
  }
})
