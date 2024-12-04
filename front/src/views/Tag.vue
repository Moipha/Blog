<script lang="ts" setup>
import BlogList from '@/views/BlogList.vue'

import { inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 获取路由中的id和name
const props = defineProps({
  id: String
})
const route = useRoute()
const { name } = route.query

// 更新标题
const updateTitle = inject<(val: string) => void>('updateTitle')

onMounted(() => {
  updateTitle('标签 - ' + name)
})
</script>

<template>
  <section>
    <BlogList
      :conditions="{
        tags: [props.id],
        enable: true,
        title: ''
      }" />
  </section>
</template>

<style lang="scss" scoped>
.board {
  width: 75%;
  padding: 10vh 8vw;
}
</style>
