import { createVNode } from 'vue'
import * as Icons from '@ant-design/icons-vue'

export const IconAnt = (props: { icon: string }): unknown => {
  const { icon } = props

  return createVNode(Icons[icon as keyof typeof Icons])
}
