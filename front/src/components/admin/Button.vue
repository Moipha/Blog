<script lang="ts" setup>
defineProps({
  label: {
    type: String
  },
  icon: {
    type: String
  },
  bgColor: {
    type: String,
    default: 'var(--text)'
  },
  textColor: {
    type: String,
    default: 'var(--bg)'
  },
  hoverColor: {
    type: String,
    default: 'var(--hover)'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    :style="{ backgroundColor: bgColor, color: textColor, '--hc': hoverColor }"
    type="button">
    <Icon v-if="icon" class="icon" :name="icon" />
    <slot>{{ label }}</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  font-size: 14px;
  padding: 10px 15px;
  border: var(--normal-border);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.2s all ease;
  text-wrap: nowrap;

  .icon {
    font-size: 18px;
  }

  &:hover {
    background-color: var(--hc) !important;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
