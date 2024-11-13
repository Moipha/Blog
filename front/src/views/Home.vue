<script setup>
import Cover from '@/layouts/Cover.vue'
import Board from '@/layouts/Board.vue'

import cover1 from '@/assets/img/summer1.png'
import cover2 from '@/assets/img/summer2.png'
</script>

<template>
  <section>
    <Cover
      class="cover"
      :src="Math.random(1) > 0.5 ? cover1 : cover2"
      height="100vh"
      title="Hi！欢迎来到漾春的博客站点" />

    <Board class="board">123123 </Board>
  </section>
</template>

<style lang="scss" scoped>
section {
  .cover {
    margin-bottom: -64px;
  }
  .board {
    width: 75vw;
  }
}
</style>
