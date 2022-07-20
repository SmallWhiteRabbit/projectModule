export default [
  {
    path: '/task',
    name: 'task',
    component: () => import(/*webpackChunkName:"task"*/ '@/pages/Task/Index.vue'),
    meta: {
      title: 'menu.task.manage',
      icon: 'Notebook'
    },
    children: [
      {
        path: '/task/list',
        name: 'taskList',
        component: () => import('@/pages/Task/taskList/index.vue'),
        meta: {
          title: 'menu.task.taskList'
        }
      },
      {
        path: '/task/apart',
        name: 'taskApart',
        component: () => import('@/pages/Task/taskApart/index.vue'),
        meta: {
          title: 'menu.task.taskApart'
        }
      },
      {
        path: '/task/defineTemplate',
        name: 'taskDefineTemplate',
        component: () => import('@/pages/Task/DefineTemplate/Index.vue'),
        meta: {
          title: 'menu.task.defineTemplate'
        }
      },
      {
        path: '/task/manualOrder',
        name: 'taskManualOrder',
        component: () => import('@/pages/Task/manualOrder/Index.vue'),
        meta: {
          title: 'menu.task.manualOrder'
        }
      },
      {
        path: '/task/processArrange',
        name: 'processArrange',
        component: () => import('@/pages/Task/processArrange/Index.vue'),
        meta: {
          title: 'menu.task.processArrange'
        }
      }
    ]
  }
]
