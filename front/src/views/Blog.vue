<template>
  <section>
    {{ id }}
  </section>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
section {
  background-color: var(--bg);
  color: var(--text);
  padding: 74px 12vw 0;
}
</style>
