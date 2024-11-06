<script lang="ts" setup>
import Mask from '@/components/Mask.vue'
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
// 实现show和modelValue的双向绑定
const show = ref<boolean>(props.modelValue)
watch(show, (val) => {
  emit('update:modelValue', val)
})
watch(
  () => props.modelValue,
  (val) => {
    show.value = val
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition>
      <section v-if="modelValue">
        <h1>{{ title }}</h1>
        <slot></slot>
      </section>
    </Transition>
  </Teleport>
  <Mask v-model="show" />
</template>

<style lang="scss" scoped>
section {
  // height: 90vh;
  // max-height: 680px;
  // min-height: 500px;
  width: 40vw;
  max-width: 580px;
  min-width: 400px;
  border-radius: 20px;
  border: var(--normal-border);
  padding: 20px 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  color: var(--text);
  background-color: var(--table-hover);
  transform: translate(-50%, -50%) scale(1);
  z-index: 20;
  display: flex;
  flex-direction: column;
  filter: brightness(1);

  h1 {
    margin-bottom: 10px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: 0.2s all ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}
</style>
