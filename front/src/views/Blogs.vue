<script lang="ts" setup>
import Cover from '@/layouts/Cover.vue'
import BlogList from '@/views/BlogList.vue'
import coverImg from '@/assets/img/3.jpg'
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="60vh" title="归档" />
    <BlogList
      class="main"
      :conditions="{
        title: '',
        enable: true,
        tags: []
      }" />
  </section>
</template>

<style lang="scss" scoped>
.main {
  width: 76vw;
  padding: 6vh 7vw;
  margin: auto;
}
</style>
