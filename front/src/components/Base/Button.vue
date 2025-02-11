<script lang="ts" setup>
defineProps({
  label: { type: String },
  icon: { type: String }
})
</script>

<template>
  <button>
    <Icon :name="icon" class="icon" />
    <slot>{{ label }}</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--text);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px #00000088;
  transition: box-shadow 0.2s ease, color 0.2s ease;

  &:hover {
    box-shadow: 4px 4px 10px #00000088;
    color: var(--active);
  }
}
</style>
