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
    flex: 1;
    overflow-x: auto;
    color: var(--text);
    background-color: var(--bg);
    border-radius: 50px 0 0 0;
    padding: 20px 20px 0 50px;
  }
}
</style>
