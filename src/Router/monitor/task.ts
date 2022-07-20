export default [
  {
    path: '/monitor/task',
    name: 'monitorTask',
    component: () => import(/*webpackChunkName:"task"*/ '@/pages/Monitor/task/index.vue'),
    meta: {
      title: 'menu.monitor.task'
    },
    children: [
      {
        path: '/monitor/task/history',
        name: 'monitorTaskHistory',
        component: () => import('@/pages/Monitor/Task/history/Index.vue'),
        meta: {
          title: 'menu.monitor.taskHistory'
        }
      },
      {
        path: '/monitor/task/realTime',
        name: 'monitorTaskRealTime',
        component: () => import('@/pages/Monitor/Task/realTime/Index.vue'),
        meta: {
          title: 'menu.monitor.taskRealTime'
        }
      }
    ]
  }
]
