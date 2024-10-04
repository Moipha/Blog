<template>
  <main>
    <Header></Header>
    <RouterView></RouterView>
  </main>
</template>

<script setup>
import Header from '@/layouts/Header.vue'
</script>

<style lang="scss" scoped>
main {
  background-color: var(--bg);
}
</style>
