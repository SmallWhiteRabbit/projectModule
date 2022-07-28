<template>
  <section class="login-page" :style="'background-image:url(' + bgImage + ')'">
    <section class="login-module">
      <p class="login-title">{{ $store.state.systemParams.sysName }}</p>
      <section class="login-form">
        <my-form :form-data="formData" :form-list="formListItem" @valid-form="validForm" @submit="handleSubmit">
          <template #username>
            <a-input v-model:value="formData.username" placeholder="">
              <template #prefix><user-outlined /></template>
            </a-input>
          </template>
          <template #password>
            <a-input-password v-model:value="formData.password" placeholder="">
              <template #prefix><lock-outlined /></template>
            </a-input-password>
          </template>
        </my-form>
        <section class="login-msg">
          <a-checkbox v-model:checked="isLoginAuto" :label="t('Login.loginAuto')">{{ t('Login.loginAuto') }}</a-checkbox>

          <!-- <p class="forgetPsw">{{ t('Login.forgetPsw') }}</p> -->
        </section>
        <a-button class="login-btn" type="primary" @click="handleSuccess">{{ t('Login.login') }}</a-button>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed } from 'vue'
import { login } from '@/utils/api/login'
import store from '@/Store'
import { isLoginAutoLocalData } from '@/utils/storage/local/index'
import FormConfig from '@/config/form/login'
import { useLocale } from 'youibot-plus'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Login',
  components: { UserOutlined, LockOutlined },
  setup() {
    const isLoginAuto = ref(true)
    const { formData, formListItem } = FormConfig
    const { t } = useLocale()
    const state = reactive({
      formListItem,
      formData,
      handleSuccess: (): void => {} //调取form中表单校验
    })
    const handleSubmit = (): void => {
      login(state.formData).then(() => {
        isLoginAutoLocalData(JSON.stringify(isLoginAuto.value))
        store.dispatch('SET_ROUTERS')
      })
    }
    const validForm = (s: () => void): void => {
      state.handleSuccess = s
    }
    const bgImage = ref(
      computed(() => {
        return store.state.systemParams.sysLogoPc
      })
    )

    return {
      ...toRefs(state),
      validForm,
      isLoginAuto,
      handleSubmit,
      bgImage,
      t
    }
  }
})
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.login-module {
  position: absolute;
  right: 10%;
  bottom: 20%;
  width: 20%;
  min-width: 400px;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}

.login-title {
  margin-bottom: 0;
  padding: 40px 0;
  font-weight: bolder;
  font-size: 32px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.login-form {
  padding: 20px 20px 40px;

  .login-btn {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
