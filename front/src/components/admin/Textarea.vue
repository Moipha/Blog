<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String
  },
  label: {
    type: String || undefined,
    default: ''
  },
  placeholder: {
    type: String
  },
  decorator: {
    type: Function || undefined
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="container">
    <label v-if="label">{{ label }}</label>
    <textarea
      rows="6"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        emit(
          'update:modelValue',
          decorator
            ? decorator(($event.target as HTMLInputElement).value)
            : ($event.target as HTMLInputElement).value
        )
      "
    />
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

  textarea {
    border-radius: 10px;
    outline: none;
    background-color: var(--bg);
    border: 1.5px solid var(--border);
    color: var(--text);
    padding: 10px;
    transition: border 0.2s ease;
    font-family: microsoft yahei;
    resize: vertical;
    min-height: 40px;

    &:focus {
      border-color: var(--hover);
    }
  }
}
</style>
