import type { App } from 'vue'
import MyDrawerForm from '@/components/common/my-drawer-form'
import MyTable from '@/components/common/my-table'
import MyDrawer from '@/components/common/my-drawer'
import MyFilter from '@/components/common/my-filter'
import MyModal from '@/components/common/my-modal'
import MyModalForm from '@/components/common/my-modal-form'
import MyForm from '@/components/common/my-form'
export const components = {
  MyDrawerForm,
  MyTable,
  MyDrawer,
  MyFilter,
  MyModal,
  MyForm,
  MyModalForm
}
export type componentNameType = keyof typeof components
export const componentKeys = Object.keys(components)

const myComponent = {
  install(Vue: App): void {
    componentKeys.forEach(k => {
      const component = components[k as componentNameType]

      Vue.component(component.name, component)
    })
  }
}

export default myComponent
