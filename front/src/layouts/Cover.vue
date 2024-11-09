<script lang="ts" setup>
defineProps({
  src: String,
  height: { type: String, default: '70vh' }
})
</script>

<template>
  <div class="bg" :style="{ height }">
    <img :src="src" alt="cover" />
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 16px;
  margin-bottom: -100px;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(var(--brightness));
  }

  .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
}
</style>
