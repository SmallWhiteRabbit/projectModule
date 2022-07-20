import deviceParams from './deviceParams'
export default [
  {
    path: '/business',
    name: 'business',
    component: () => import(/*webpackChunkName:"Business"*/ '@/pages/Business/Index.vue'),
    meta: {
      title: 'menu.business.config',
      icon: 'Shop'
    },
    children: [
      {
        path: '/busines/factory',
        name: 'businessFactory',
        component: () => import('@/pages/Business/Factory/Index.vue'),
        meta: {
          title: 'menu.business.factory'
        }
      },
      ...deviceParams,
      {
        path: '/busines/AgvConfig',
        name: 'businessAgvConfig',
        component: () => import('@/pages/Business/AgvConfig/Index.vue'),
        meta: {
          title: 'menu.business.AgvConfig'
        }
      },
      {
        path: '/busines/storageParams',
        name: 'businessStorageParams',
        component: () => import('@/pages/Business/StorageParams/Index.vue'),
        meta: {
          name: 'menu.business.storageParams'
        }
      },
      {
        path: '/busines/vehicleInfo',
        name: 'businessVehicleInfo',
        component: () => import('@/pages/Business/VehicleInfo/Index.vue'),
        meta: {
          title: 'menu.business.vehicleInfo'
        }
      },
      {
        path: '/busines/materialInfo',
        name: 'businessMaterialInfo',
        component: () => import('@/pages/Business/MaterialInfo/Index.vue'),
        meta: {
          title: 'menu.business.materialInfo'
        }
      },
      {
        path: '/busines/elementGroup',
        name: 'businessElementGroup',
        component: () => import('@/pages/Business/ElementGroup/Index.vue'),
        meta: {
          title: 'menu.business.elementGroup'
        }
      },
      {
        path: '/busines/pointPriority',
        name: 'businessPointPriority',
        component: () => import('@/pages/Business/PointPriority/Index.vue'),
        meta: {
          title: 'menu.business.pointPriority'
        }
      }
    ]
  }
]
