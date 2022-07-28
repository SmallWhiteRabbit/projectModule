<template>
  <a-popover placement="bottomRight" trigger="hover" :overlay-class-name="'userInfo hd_popover'">
    <template #content>
      <a-menu @click="handleCommand">
        <a-menu-item v-for="item in list" :key="item.path">
          {{ t(item.label) }}
        </a-menu-item>
      </a-menu>
    </template>

    <a-badge>
      <user-outlined :style="{ fontSize: '20px' }" />
    </a-badge>
  </a-popover>
  <FormUpdatePsw :visible="isDrawer" @cancel="isFormShow" @success="isFormShow"></FormUpdatePsw>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { toNext } from '@/Router'
import { logout } from '@/utils/api/login'
import FormUpdatePsw from './update-password.vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { useLocale } from 'youibot-plus'
export default defineComponent({
  name: 'User',
  components: {
    FormUpdatePsw,
    UserOutlined
  },
  setup() {
    const { t } = useLocale()
    const list = reactive([
      {
        label: 'system.changePsw',
        path: 1
      },
      {
        label: 'system.loginOut',
        path: 2
      }
    ])
    const isDrawer = ref(false)
    const isFormShow = () => {
      isDrawer.value = !isDrawer.value
    }

    /**
     * @param {object}menu 每一项
     * @param {number}menu.key 哪一项
     */
    function handleCommand(menu: { key: number }): void {
      if (menu.key === 1) {
        isFormShow()
      } else if (menu.key === 2) {
        logout().then(() => {
          toNext({ path: '/login' })
        })
      }
    }

    return { list, handleCommand, isDrawer, isFormShow, t }
  }
})
</script>
