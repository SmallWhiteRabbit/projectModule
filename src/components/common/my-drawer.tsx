import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return (): JSX.Element => {
      return (
        <a-drawer class="my-drawer" width="500px" closable={false} {...props} v-slots={slots}>
          {slots?.content && slots.content()}
        </a-drawer>
      )
    }
  }
})
