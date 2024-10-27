<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

// 改变值
function onChange(e: Event) {
  emits('update:modelValue', (e.target as HTMLSelectElement).value)
  emits('change')
}
</script>

<template>
  <select @change="onChange">
    <slot></slot>
  </select>
</template>

<style lang="scss" scoped>
select {
  position: relative;
  border-radius: 10px;
  outline: none;
  background-color: var(--bg);
  border: 1.5px solid var(--border);
  color: var(--text);
  padding: 10px;
  height: 40px;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--hover);
  }
}
</style>
