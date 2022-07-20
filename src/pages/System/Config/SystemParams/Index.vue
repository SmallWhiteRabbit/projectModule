<template>
  <section class="system-params">
    <p class="sp-title">{{ t('systemParams.loginLogo') }}</p>
    <div class="logo-container">
      <div>
        <p class="logo-title">{{ t('systemParams.loginLogo') }}({{ t('systemParams.pc') }})</p>
        <a-image :src="logoPc.configValue"></a-image>
        <label class="btn" for="upload-file-pc">
          {{ t('systemParams.revise') }}
        </label>
        <input id="upload-file-pc" style="display: none" type="file" @change="chooseUploadFile($event, changePcLogo)" />
      </div>
      <div>
        <p class="logo-title">{{ t('systemParams.loginLogo') }}({{ t('systemParams.pda') }})</p>
        <a-image :src="logoPad.configValue"></a-image>
        <label class="btn" for="upload-file-pda">
          {{ t('systemParams.revise') }}
        </label>
        <input id="upload-file-pda" style="display: none" type="file" @change="chooseUploadFile($event, changePdaLogo)" />
      </div>
    </div>

    <p class="sp-title">{{ t('systemParams.name') }}</p>
    <a-input v-model="sysName.configValue" class="sp-input">
      <template #addonBefore>{{ t('systemParams.curName') }}:</template>
      <template #addonAfter>
        <a-button type="primary" @click="changeName">{{ t('systemParams.revise') }}</a-button>
      </template>
    </a-input>
    <p class="sp-title">{{ t('systemParams.loginErrorTimes') }}</p>
    <a-input v-model="userErrCount.configValue" class="sp-input" type="number">
      <template #addonBefore>{{ t('systemParams.curTime') }}:</template>
      <template #addonAfter>
        <a-button type="primary" @click="changeTime">{{ t('systemParams.revise') }}</a-button>
      </template>
    </a-input>
    <p>{{ t('systemParams.tips') }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { upload } from '@/utils/api/common'
import { chooseUploadFile } from '@/utils/upload'
import { $msg } from '@/utils/message'
import { useLocale } from 'youibot-plus'
import { list, edit } from '@/utils/api/system/system-params'
import store from '@/Store'
interface configRow {
  configKey: string
  configId: number
  configName: string
  configValue: string
}
export default defineComponent({
  name: 'SystemParams',
  setup() {
    const { t } = useLocale()

    const State = reactive({
      userErrCount: <configRow>{},
      logoPc: <configRow>{},
      logoPad: <configRow>{},
      sysName: <configRow>{}
    })

    const isFileTypr = (type: string) => {
      return !/(png|gif|jpeg|jpg)/i.test(type)
    }

    /**
     * 上传
     *
     * @param {File} file 文件流
     */
    async function uploadFn(file: File) {
      let formData = new FormData()

      formData.append('file', file)
      let { data } = await upload(formData)

      return data
    }

    /**
     * @param {object} item 系统参数
     */
    function configKeySwitch(item: configRow) {
      switch (item.configKey) {
        case 'sys.user.errCount':
          State.userErrCount = item
          break
        case 'sys.logo.pc':
          State.logoPc = item
          break
        case 'sys,logo.pad':
          State.logoPad = item
          break
        case 'sys.name':
          State.sysName = item
          break
        default:
          break
      }
    }
    const getList = () => {
      list().then(res => {
        let data = res.data

        data.forEach((item: configRow) => {
          configKeySwitch(item)
        })
      })
    }

    const editFn = (data: configRow) => {
      edit(data).then(() => {
        $msg.success({ message: t('system.operationSuccess') })
        getList()
        store.dispatch('SET_SYSTEM_PARAMS')
      })
    }

    const changeTime = () => {
      if (!State.userErrCount.configValue) {
        $msg.warning({ message: t('systemParams.PleaseEnterCurrentNumber') })
        return
      }
      editFn(State.userErrCount)
    }
    const changeName = () => {
      if (!State.sysName.configValue) {
        $msg.warning({ message: t('systemParams.pleaseEnterSystemName') })
        return
      }
      editFn(State.sysName)
    }

    /**
     * pda logo
     *
     * @param {File} file 文件流
     */
    async function changePdaLogo(file: File) {
      let { type } = file

      if (isFileTypr(type)) {
        $msg.warning({ message: t('system.fileTypeErr') })
        return false
      }
      let data = await uploadFn(file)

      State.logoPad.configValue = data.url
      editFn(State.logoPad)
    }

    /**
     * pc logo
     *
     * @param {File} file 文件流
     */
    async function changePcLogo(file: File) {
      let { type } = file

      if (isFileTypr(type)) {
        $msg.warning({ message: t('system.fileTypeErr') })
        return false
      }
      let data = await uploadFn(file)

      State.logoPc.configValue = data.url
      editFn(State.logoPc)
    }

    onMounted(() => {
      getList()
    })

    return {
      ...toRefs(State),
      changePcLogo,
      changePdaLogo,
      changeTime,
      changeName,
      chooseUploadFile,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.system-params {
  padding: 20px;
  background-color: #fff;
}

.sp-title {
  height: 50px;
  padding-left: 14px;
  font-size: 24px;
  line-height: 50px;
  border-left: 4px solid #007bed;
}

.sp-input {
  margin: 0 0 20px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;

  .btn {
    padding: 3px 10px;
    color: #fff;
    font-size: 14px;
    background-color: @btnColor;
    border: 1px solid @btnColor;
    border-radius: 4px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(50% - 20px);
    height: 100%;
    min-height: 345px;
    padding: 20px 0;
    border: 1px solid @spLogoBorder;

    > .logo-title {
      font-size: 24px;
    }
  }
}
</style>
<style lang="less">
.sp-input {
  .ant-btn {
    height: 30px;
  }
}

.logo-container {
  .ant-image {
    width: 50%;
    height: 50%;
    margin: 0 0 20px;
  }
}
</style>
