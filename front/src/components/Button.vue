<template>
  <button>
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
button {
  outline: none;
  border: 1px solid var(--border);
  cursor: pointer;
  background-color: transparent;
  color: var(--text);
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: var(--border);
  }
}
</style>
