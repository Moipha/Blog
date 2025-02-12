<script setup>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
</script>

<template>
  <main>
    <Header />
    <section>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </section>
    <Footer />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: var(--back);

  section {
    min-height: 100vh;
  }
}
</style>
