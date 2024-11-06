<template>
  <main>
    <Aside />
    <section>
      <Header />
      <div class="right-wrapper">
        <RouterView />
      </div>
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
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex: 1;
    overflow-x: auto;
    color: var(--text);
    background-color: var(--bg);
    border-radius: 50px 0 0 0;
  }
  .right-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 0 50px;
    scrollbar-width: thin;
    scrollbar-color: var(--hover) var(--border);
  }
}
</style>
