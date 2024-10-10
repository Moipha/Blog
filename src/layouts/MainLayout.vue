<template>
  <main>
    <Header></Header>
    <section>
      <RouterView></RouterView>
    </section>
    <Footer />
  </main>
</template>

<script setup>
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
</script>

<style lang="scss" scoped>
main {
  background-color: var(--bg);

  section {
    min-height: 100vh;
  }
}
</style>
