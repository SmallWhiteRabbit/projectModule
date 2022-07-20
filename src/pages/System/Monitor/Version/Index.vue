<template>
  <div class="system-version">
    <a-row>
      <a-col :span="12">
        <div class="sys-infos-l">
          <div v-for="(item, key) in data" :key="key" class="sys-info">
            <div class="version-title">{{ t(`version.${key}`) }}</div>
            <p class="version-content" v-html="item"></p>
          </div>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="sys-infos-r">
          <div class="sys-book-infos">
            <IconAnt :icon="'FileTextOutlined'"></IconAnt>

            <div class="sys-book-info">
              <span>{{ data.systemName }} {{ data.versionName }}</span>
              <span>{{ data.updateDate }} {{ t('version.upLoad') }}</span>
            </div>
          </div>
          <div class="operate-btn">
            <a-button @click="downLoad">{{ t('version.downCurrentVersion') }}</a-button>
            <label class="a-button ant-btn" for="upload-file-pda">
              {{ t('version.uploadNewVersion') }}
            </label>
            <input id="upload-file-pda" style="display: none" type="file" @change="chooseUploadFile($event, uploadDoc)" />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useLocale } from 'youibot-plus'
import { list, editUserGuideUrl } from '@/utils/api/system/version'
import { chooseUploadFile } from '@/utils/upload'
import { upload } from '@/utils/api/common'
import { $msg } from '@/utils/message'
export default defineComponent({
  name: 'Version',
  setup() {
    const { t } = useLocale()
    let state = reactive({
      data: {
        systemName: '',
        versionName: '',
        updateDate: '',
        changeLog: ''
      },
      userGuideUrl: ''
    })

    /**
     * 获取系统数据
     */
    function getSystemData() {
      list().then(res => {
        let { data } = res

        for (let key in state.data) {
          state.data[key as keyof typeof state.data] = data[key]
        }
        state.userGuideUrl = data.userGuideUrl
      })
    }
    /**
     * @param {string} url 地址
     * @param {string} fileName 文件名
     */
    function create_link(url: string, fileName: string) {
      const elink = document.createElement('a') // 创建a标签

      elink.download = fileName // a标签添加属性
      elink.style.display = 'none'
      elink.href = url
      document.body.appendChild(elink)
      elink.click() // 执行下载
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink) // 释放标签
    }
    /**
     * 下载
     */
    function downLoad() {
      create_link(state.userGuideUrl, state.data.systemName + '-' + state.data.versionName)
    }
    onMounted(() => {
      getSystemData()
    })
    const isFileTypr = (type: string) => {
      return !/(doc|pdf|docx)/i.test(type)
    }

    /**
     * @param {FormData} formData 上传
     */
    async function uploadFn(formData: FormData) {
      let { data } = await upload(formData)

      return data
    }
    const editData = () => {
      editUserGuideUrl({ userGuideUrl: state.userGuideUrl }).then(() => {
        getSystemData()
      })
    }

    /**
     * @param {File} file 文件流
     */
    async function uploadDoc(file: File) {
      let { name } = file
      let type = name.split('.')[1]

      if (isFileTypr(type)) {
        $msg.warning({ message: t('system.fileTypeErr') })
        return false
      }
      let formData = new FormData()

      formData.append('file', file)
      formData.append('name', state.data.systemName + '-' + state.data.versionName)
      let data = await uploadFn(formData)

      state.userGuideUrl = data.url
      // 调系统版本接口
      editData()
    }
    return {
      ...toRefs(state),
      downLoad,
      upload,
      chooseUploadFile,
      uploadDoc,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.system-version {
  .ant-row {
    height: 100%;

    .ant-col {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .sys-infos-l {
    width: 80%;

    .version-title {
      width: 120px;
    }

    .version-content {
      width: calc(100% - 120px);
    }

    .sys-info {
      display: flex;
      padding-bottom: 15px;
      font-size: 16px;
    }
  }

  .operate-btn {
    padding-top: 30px;

    .a-button {
      margin-left: 15px;
      padding: 5px 15px;
      color: #fff;
      background-color: #d7d7d7;
    }
  }

  .sys-infos-r {
    width: 80%;

    .sys-book-infos {
      display: flex;
      align-items: center;

      .sys-book-info {
        padding-left: 5px;

        span:first-child {
          display: block;
          color: #555;
          font-size: 18px;
          line-height: 35px;
        }

        span:last-child {
          display: block;
          color: #7f7f7f;
          font-size: 16px;
          line-height: 20px;
        }
      }

      .anticon {
        color: #d7d7d7;
        font-size: 84px;
      }
    }
  }
}
</style>
