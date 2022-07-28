<template>
  <a-popover placement="bottomRight" trigger="hover" :overlay-class-name="'system_msg hd_popover'">
    <template #content>
      <p v-for="item in list" :key="item.msg" class="msgItem">
        <span class="msg">{{ item.msg }}</span>
        <a-button type="text">查看更多</a-button>
      </p>
      <a-button class="seeMore" type="primary" ghost>查看更多</a-button>
    </template>
    <template #title>
      <span class="count">消息通知（{{ count }}）</span>
      <span class="tag">标记已读</span>
    </template>
    <a-badge :count="count">
      <message-outlined :style="{ fontSize: '20px' }" />
    </a-badge>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MessageOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'MyMessage',
  components: { MessageOutlined },
  setup() {
    const count = 5
    const list = ref([
      { msg: '【提醒】这是一条消息这是一条消息这是一条 消息这是一条消息这是...' },
      { msg: '【提醒】这是一条消息这是一条消息这是一条 消息这是一条消息这是...' },
      { msg: '【提醒】这是一条消息这是一条消息这是一条 消息这是一条消息这是...' }
    ])

    return { count, list }
  }
})
</script>

<style lang="less">
.ant-badge {
  height: 100%;
  line-height: 64px;
  cursor: pointer;

  .ant-scroll-number {
    top: 30%;
    right: 32%;
  }

  .ant-badge-count {
    box-shadow: 0 0 0 1px #e34d59;
  }
}

.system_msg {
  .ant-popover-content .ant-popover-inner {
    width: 315px;
    padding: 16px;

    .ant-popover-inner-content {
      padding: 0;
      border: none;
    }

    .ant-popover-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 0;
      padding: 0 0 8px;

      span.count {
        color: var(--font-gy1);
        font-size: 14px;
      }

      span.tag {
        color: var(--font-gy2);
        font-size: 12px;
      }
    }

    .msgItem {
      position: relative;
      margin: 0;
      padding: 8px 0;
      border-bottom: 1px solid #e7e7e7;

      .msg {
        color: var(--font-gy1);
        font-size: 14px;
      }

      .ant-btn-text {
        position: absolute;
        right: 0;
        bottom: 8px;
        height: auto;
        padding: 0;
        color: var(--primary-color);
        line-height: 1;
      }
    }

    .seeMore {
      width: 100%;
      margin-top: 16px;
    }
  }
}
</style>
