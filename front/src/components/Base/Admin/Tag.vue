<script lang="ts" setup>
defineProps({
  icon: { type: String },
  label: { type: String }
})
</script>

<template>
  <div class="tag">
    <Icon v-if="icon" :url="icon" />
    <slot>{{ label }}</slot>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  display: flex;
  align-items: center;
  background-color: var(--text);
  color: var(--bg);
  border: var(--normal-border);
  border-radius: 10px;
  padding: 0 8px;
  font-size: 12px;
  gap: 3px;
  cursor: default;

  &:hover {
    background-color: var(--hover);
  }
}
</style>
