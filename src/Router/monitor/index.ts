import Task from './task'
export default [
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import(/*webpackChunkName:"task"*/ '@/pages/Monitor/index.vue'),
    meta: {
      title: 'menu.monitor.config',
      icon: 'DataLine'
    },
    children: [
      {
        path: '/monitor/statisticalKanban',
        name: 'monitorStatisticalKanban',
        component: () => import('@/pages/Monitor/statisticalKanban/index.vue'),
        meta: {
          title: 'menu.monitor.statisticalKanban'
        }
      },
      ...Task,
      {
        path: '/monitor/AGVOperate',
        name: 'monitorAGVOperate',
        component: () => import('@/pages/Monitor/AGVOperate/Index.vue'),
        meta: {
          title: 'menu.monitor.AGVOperate'
        }
      },
      {
        path: '/monitor/AGVTask',
        name: 'monitorAGVTask',
        component: () => import('@/pages/Monitor/AGVTask/index.vue'),
        meta: {
          title: 'menu.monitor.AGVTask'
        }
      },
      {
        path: '/monitor/WMS',
        name: 'monitorWMS',
        component: () => import('@/pages/Monitor/WMS/Index1.vue'),
        meta: {
          title: 'menu.monitor.WMS'
        }
      },
      {
        path: '/monitor/expection',
        name: 'monitorExpection',
        component: () => import('@/pages/Monitor/expection/index.vue'),
        meta: {
          title: 'menu.monitor.expection'
        }
      },
      {
        path: '/monitor/interface',
        name: 'monitorInterface',
        component: () => import('@/pages/Monitor/interface/index.vue'),
        meta: {
          title: 'menu.monitor.interface'
        }
      }
    ]
  }
]
