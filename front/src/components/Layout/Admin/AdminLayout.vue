<script lang="ts" setup>
import Aside from '@/components/Layout/Admin/Aside.vue'
import Header from '@/components/Layout/Admin/Header.vue'
</script>

<template>
  <main>
    <Aside />
    <section>
      <Header />
      <div class="right-wrapper">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: var(--text);
  display: flex;
  min-height: 100vh;

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

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: var(--bg);

    section {
      border-radius: 0;
      margin-bottom: 60px;
    }

    .right-wrapper {
      padding: 0 10px;
    }
  }
}
</style>
