<script lang="ts" setup>
import { inject, onMounted, ref, useSlots } from 'vue'

const registerColumn = inject('registerColumn') as Function
const props = defineProps({
  prop: {
    type: String
  },
  label: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 100
  }
})
const slots = useSlots()
const yet = ref<boolean>(false)

onMounted(() => {
  if (registerColumn && !yet.value) {
    registerColumn(props.prop, props.label, props.width, slots['default'])
    yet.value = true
  }
})
</script>

<template></template>

<style lang="scss" scoped></style>
