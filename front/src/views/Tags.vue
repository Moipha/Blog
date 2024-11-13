<script lang="ts" setup>
import Cover from '@/layouts/Cover.vue'
import Board from '@/layouts/Board.vue'

import coverImg from '@/assets/img/summer4.png'
import api from '@/api'
import { Res, Tag } from '@/type'
import { ref } from 'vue'

const tags = ref<Tag[]>([])
function getTags() {
  api.tag.getAll(['blog', 'code', 'general'], (res: Res) => {
    tags.value = res.data
  })
}
getTags()
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="80vh" title="标签" />
    <Board class="board">
      <div class="tag-container">
        <RouterLink class="tag" v-for="tag of tags" :key="tag._id" :to="'/tags/' + tag._id">
          {{ tag.name }}
        </RouterLink>
      </div>
    </Board>
  </section>
</template>

<style lang="scss" scoped>
.board {
  width: 75%;
  padding: 10vh 8vw;

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .tag {
      color: var(--text);
      font-size: 20px;
      text-decoration: none;
    }
  }
}
</style>
