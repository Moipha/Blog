<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'

defineProps({
  // teleport
  to: {
    type: String,
    default: 'body'
  }
})
// 是否显示遮罩
const show = defineModel<boolean>()
// 遮罩
const mask = ref<HTMLElement | null>(null)
// 计算遮罩高度
watch(show, (val) => {
  if (val) {
    nextTick(() => {
      mask.value.style.height = document.body.scrollHeight + 'px'
    })
  }
})
</script>

<template>
  <Teleport :to="to">
    <Transition name="fade">
      <div ref="mask" v-if="show" class="nav-mask" @click="show = false" />
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.nav-mask {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 5;
  opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
