export default [
  {
    path: '/system/tool',
    name: 'systemTool',
    component: () => import('@/pages/System/tool/index.vue'),
    meta: {
      title: 'menu.system.tool',
      icon: 'Setting'
    },
    children: [
      {
        path: '/system/tool/parameter',
        name: 'systemToolParameter',
        component: () => import('@/pages/System/tool/parameter/index.vue'),
        meta: {
          title: 'menu.system.parameter'
        }
      },
      {
        path: '/system/tool/dict',
        name: 'systemToolDict',
        component: () => import('@/pages/System/tool/dict/index.vue'),
        meta: {
          title: 'menu.system.dict'
        }
      },
      {
        path: '/system/tool/schedule',
        name: 'systemToolSchedule',
        component: () => import('@/pages/System/tool/schedule/index.vue'),
        meta: {
          title: 'menu.system.schedule'
        }
      }
    ]
  }
]
