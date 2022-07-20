import Tool from './tool'
import Monitor from './monitor'
import Config from './config'
export default [
  {
    path: '/system',
    name: 'system',
    component: () => import(/*webpackChunkName:"system"*/ '@/pages/System/index.vue'),
    meta: {
      title: 'menu.system.setting',
      icon: 'Setting'
    },
    children: [...Config, ...Tool, ...Monitor]
  }
]
