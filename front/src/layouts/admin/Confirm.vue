<script lang="ts" setup>
import Dialog from './Dialog.vue'
import Button from '@/components/admin/Button.vue'

defineProps({
  title: {
    type: String,
    default: '确认操作'
  },
  content: {
    type: String
  },
  okBtn: {
    type: String,
    default: '确定'
  },
  cancelBtn: {
    type: String,
    default: '取消'
  }
})
const emits = defineEmits(['callback'])
// 新建标签弹窗
const dialog = defineModel<boolean>()
// 点击确定按钮
function callback() {
  dialog.value = false
  emits('callback')
}
</script>

<template>
  <Dialog v-model="dialog" :title>
    <div class="delete-text">
      <slot>
        <p>{{ content }}</p>
      </slot>
    </div>

    <div class="btn-group">
      <slot name="btn">
        <Button @click="callback">{{ okBtn }}</Button>
        <Button @click="dialog = false">{{ cancelBtn }}</Button>
      </slot>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.delete-text {
  margin-top: 10px;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}
</style>
