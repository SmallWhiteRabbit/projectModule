<template>
  <a-select v-bind="$attrs" dropdown-class-name="dropdown-class-name" :open="open" @select="selectOption" @click="openSelect">
    <template #dropdownRender="{ menuNode: menu }">
      <v-nodes :vnodes="menu" />
      <a-divider style="margin: 4px 0" />
      <section class="select-add">
        <a-input v-model:value="newWord" allow-clear @click="e => e.target.focus()"></a-input>
        <p class="select-add-opt" @click="handleAddItem">
          <plus-outlined />
          {{ t('system.add') }}
        </p>
      </section>
    </template>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'SelectAdd',
  components: {
    PlusOutlined,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes
    }
  },
  props: {
    funcAdd: {
      type: Function
    }
  },
  setup(props) {
    const { t } = useLocale()
    const state = reactive({
      newWord: '',
      open: false
    })

    /**
     *
     */
    function openSelect() {
      state.open = !state.open
    }
    /**
     *
     */
    function selectOption() {
      // 单选时设置
      state.open = false
    }

    /**
     *
     */
    function handleAddItem() {
      props.funcAdd(state.newWord)
      state.newWord = ''
    }
    return { openSelect, selectOption, ...toRefs(state), handleAddItem, t }
  }
})
</script>
<style lang="less" scoped>
.select-add {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;

  .select-add-opt {
    width: 120px;
    margin-bottom: 0;
    margin-left: 10px;
  }
}
</style>
