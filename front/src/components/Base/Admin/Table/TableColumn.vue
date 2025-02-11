<script lang="ts" setup>
import { inject, onMounted, ref, useSlots, VNodeChild } from 'vue'

// 获取Table中注入的注册列的方法
const registerColumn =
  inject<
    (
      prop: string,
      label: string,
      width: number,
      slots: ((item: any) => VNodeChild) | undefined
    ) => {}
  >('registerColumn')
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
// 获取该列的插槽函数
const slots = useSlots()
// 是否已注册
const yet = ref<boolean>(false)

onMounted(() => {
  // 注册列，传入该列的属性名/列名/宽度/插槽
  if (registerColumn && !yet.value) {
    registerColumn(props.prop, props.label, props.width, slots['default'])
    yet.value = true
  }
})
</script>

<!-- 不做渲染，仅注册。在Table中渲染列 -->
<template></template>

<style lang="scss" scoped></style>
