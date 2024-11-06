<template>
  <section>
    {{ blog }}
  </section>
</template>

<script lang="ts" setup>
import api from '@/api'
import { Blog, Res } from '@/type'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const blog = ref<Blog>({} as Blog)

// 获取博客详情
function getBlog() {
  api.blog.getById(props.id, (res: Res) => {
    blog.value = res.data
  })
}
getBlog()
</script>

<style lang="scss" scoped>
section {
  background-color: var(--bg);
  color: var(--text);
  padding: 74px 12vw 0;
}
</style>
