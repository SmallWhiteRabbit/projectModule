<template>
  <a-tabs v-model:activeKey="activeName" class="operate-book" @change="handle_tab_click">
    <a-tab-pane v-for="tab in tabs" :key="tab.name" :tab="tab.label">
      <a-collapse v-model:activeKey="activeQuestionName" :bordered="false">
        <template #expandIcon="{ isActive }">
          <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel v-for="question in questionData" :key="question.qaId" :header="question.question">
          <div class="agv-content">
            <read-outlined />
            <p>{{ question.answer }}</p>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-tab-pane>
  </a-tabs>
  <a-pagination
    v-model:current="pagination.current"
    v-model:pageSize="pagination.pageSize"
    show-size-changer
    :total="pagination.total"
    @change="handleTableChange" />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watchEffect } from 'vue'
import { useLocale } from 'youibot-plus'
import { list } from '@/utils/api/system/operat-manual'
import { ReadOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import usePage from '@/hooks/use-page'
export default defineComponent({
  name: 'OperatManual',
  components: {
    ReadOutlined,
    CaretRightOutlined
  },
  setup() {
    const { t } = useLocale()
    let activeName = ref<string>('1')
    let activeQuestionName = ref<Number>(0)
    const { pageState, getData, changeFilter } = usePage({ getPageFn: list })
    const tabs = [
      {
        label: t('operatManual.tabItems.first'),
        name: '1'
      },
      {
        label: t('operatManual.tabItems.second'),
        name: '2'
      }
    ]

    interface IQuestion {
      qaId: string
      question: string
      answer: string
    }
    let state = reactive({
      questionData: [] as Array<IQuestion>
    })

    /**
     * @param {string} activeKey 字段
     */
    function handle_tab_click(activeKey: string) {
      changeFilter({ types: activeKey })
    }

    onMounted(() => {
      changeFilter({ types: activeName.value })
    })

    const handleTableChange = (page: number, pageSize: number) => {
      pageState.pagination.pageSize = pageSize
      pageState.pagination.current = page
      getData()
    }

    watchEffect(() => {
      state.questionData = pageState.tableData as IQuestion[]
    })

    return {
      tabs,
      activeName,
      activeQuestionName,
      handle_tab_click,
      ...toRefs(state),
      handleTableChange,
      ...toRefs(pageState),
      t
    }
  }
})
</script>
<style scoped lang="less">
.operate-book {
  height: calc(100% - 32px);
  overflow: auto;

  .agv-content {
    display: flex;

    span {
      margin-right: 12px;
      font-size: 22px;
      line-height: 20px;
    }
  }
}

.ant-pagination {
  text-align: right;
}
</style>
