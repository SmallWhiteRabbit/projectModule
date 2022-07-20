export default [
  {
    path: '/system/config',
    name: 'systemConfig',
    component: () => import('@/pages/System/Config/Index.vue'),
    meta: {
      title: 'menu.system.config',
      icon: 'Setting'
    },
    children: [
      {
        path: '/system/config/menu',
        name: 'systemConfigMenu',
        component: () => import('@/pages/System/config/menu/index.vue'),
        meta: {
          title: 'menu.system.menu'
        }
      },
      {
        path: '/system/config/role',
        name: 'systemConfigRole',
        component: () => import('@/pages/System/config/role/index1.vue'),
        meta: {
          title: 'menu.system.role'
        }
      },
      {
        path: '/system/config/user',
        name: 'systemConfigUser',
        component: () => import('@/pages/System/config/user/index.vue'),
        meta: {
          title: 'menu.system.user'
        }
      },
      {
        path: '/system/config/mechanism',
        name: 'systemConfigMechanism',
        component: () => import('@/pages/System/config/mechanism/index.vue'),
        meta: {
          title: 'menu.system.mechanism'
        }
      },
      {
        path: '/system/config/station',
        name: 'systemConfigStation',
        component: () => import('@/pages/System/config/station/index.vue'),
        meta: {
          title: 'menu.system.station'
        }
      },

      {
        path: '/system/config/systemParams',
        name: 'systemConfigSystemParams',
        component: () => import('@/pages/System/config/systemParams/index.vue'),
        meta: {
          title: 'menu.system.systemParams'
        }
      }
    ]
  }
]
