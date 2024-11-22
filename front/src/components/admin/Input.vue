<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String || Number
  },
  label: {
    type: String || undefined,
    default: ''
  },
  placeholder: {
    type: String
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '100%'
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="container">
    <label v-if="label">{{ label }}</label>
    <input
      :readonly="readonly"
      :style="{
        border: noBorder ? 'none' : '',
        paddingLeft: icon ? '36px' : '',
        width: width
      }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <Icon v-if="icon" :name="icon" class="icon" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 16px;
    margin-top: 15px;
  }

  input {
    border-radius: 10px;
    outline: none;
    background-color: var(--bg);
    border: var(--normal-border);
    color: var(--text);
    padding: 10px;
    height: 40px;
    transition: border 0.2s ease;

    &:not([readonly]):focus {
      border-color: var(--hover);
    }

    &[readonly] {
      opacity: 0.5;
      &:hover {
        cursor: not-allowed;
      }
    }
  }

  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
