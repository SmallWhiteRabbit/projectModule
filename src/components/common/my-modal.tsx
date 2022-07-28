import { defineComponent } from 'vue'
import { getSlot } from '@/utils/utils'

export default defineComponent({
  name: 'MyModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    /**
     * 渲染slots
     *
     * @returns {object} slots
     */
    function render_slots(): object {
      const drawerSlots = {
        footer: getSlot(slots, 'footer')
      }

      return drawerSlots
    }

    return (): JSX.Element => {
      return (
        <a-modal class="my-modal" centered closable={false} {...props} v-slots={render_slots()}>
          {slots?.content && slots.content()}
        </a-modal>
      )
    }
  }
})
