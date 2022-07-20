export default [
  {
    path: '/busines/deviceParams',
    name: 'deviceParams',
    component: () => import('@/pages/Business/DeviceParams/Index.vue'),
    meta: {
      title: 'menu.business.deviceParams'
    },
    children: [
      {
        path: '/busines/deviceParams/deviceAccount',
        name: 'businessDeviceParamsAccount',
        component: () => import('@/pages/Business/DeviceParams/DeviceAccount/Index.vue'),
        meta: {
          title: 'menu.business.deviceAccount'
        }
      },
      {
        path: '/busines/deviceParams/IOTParams',
        name: 'businessDeviceParamsIOTParams',
        component: () => import('@/pages/Business/DeviceParams/IOTParams/Index.vue'),
        meta: {
          title: 'menu.business.IOTParams'
        }
      }
    ]
  }
]
