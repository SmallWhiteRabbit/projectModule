export default [
  {
    path: '/system/monitor',
    name: 'systemMonitor',
    component: () => import('@/pages/System/monitor/index.vue'),
    meta: {
      title: 'menu.system.monitor'
    },
    children: [
      {
        path: '/system/monitor/logLogin',
        name: 'systemMonitorlogLogin',
        component: () => import('@/pages/System/monitor/logLogin/index.vue'),
        meta: {
          title: 'menu.system.logLogin'
        }
      },
      {
        path: '/system/monitor/logOperate',
        name: 'systemMonitorLogOperate',
        component: () => import('@/pages/System/monitor/logOperate/index.vue'),
        meta: {
          title: 'menu.system.logOperate'
        }
      },
      {
        path: '/system/monitor/version',
        name: 'systemMonitorVersion',
        component: () => import('@/pages/System/monitor/version/index.vue'),
        meta: {
          title: 'menu.system.version'
        }
      },
      {
        path: '/system/monitor/exceptionDict',
        name: 'systemMonitorExceptionDict',
        component: () => import('@/pages/System/monitor/exceptionDict/index.vue'),
        meta: {
          title: 'menu.system.exceptionDict'
        }
      },
      {
        path: '/system/monitor/operatManual',
        name: 'systemMonitorOperatManual',
        component: () => import('@/pages/System/monitor/operatManual/index.vue'),
        meta: {
          title: 'menu.system.operatManual'
        }
      }
    ]
  }
]
