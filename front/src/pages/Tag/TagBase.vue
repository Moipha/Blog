<script lang="ts" setup>
import Cover from '@/components/Layout/Cover.vue'

import coverImg from '@/assets/img/summer4.png'
import { provide, ref } from 'vue'

const title = ref('标签')
// 向后代提供更新标题的方法
function updateTitle(val: string) {
  title.value = val
}
provide('updateTitle', updateTitle)
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="80vh" :title="title" />
    <RouterView />
  </section>
</template>

<style lang="scss" scoped></style>
