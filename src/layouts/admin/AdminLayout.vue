<template>
  <main>
    <Aside />
    <section>
      <Header />
      <RouterView />
    </section>
  </main>
</template>

<script lang="ts" setup>
import Aside from '@/layouts/admin/Aside.vue'
import Header from '@/layouts/admin/Header.vue'
</script>

<style lang="scss" scoped>
main {
  background-color: var(--text);
  display: flex;

  section {
    min-height: 100vh;
    width: 100%;
    background-color: var(--bg);
    border-radius: 50px 0 0 0;
    padding: 20px;
  }
}
</style>
