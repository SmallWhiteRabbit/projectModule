import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import 'youibot-plus/dist/index.css'
import myComponent from '@/components/index'
import { store, key } from './Store'
import '@/assets/styles/index.less'
import '@/assets/icon/iconfont.js'
// 引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)

app.use(Antd)

app.use(store, key).use(router).use(myComponent)

router.isReady().then((): void => {
  app.mount('#app')
})
