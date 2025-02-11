<script lang="ts" setup>
import Board from '@/components/Layout/Board.vue'

import api from '@/api'
import { Res, Tag } from '@/type'
import { inject, onMounted, ref } from 'vue'

// 标签列表
const tags = ref<Tag[]>([])
const loading = ref<boolean>(true)

function getTags() {
  loading.value = true
  api.tag.getAll(
    ['blog', 'code', 'general'],
    (res: Res) => {
      tags.value = res.data
    },
    (err: Error) => {
      console.log(err)
    },
    () => {
      loading.value = false
    }
  )
}

// 更新标题
const updateTitle = inject<(val: string) => void>('updateTitle')

onMounted(() => {
  getTags()
  updateTitle('标签')
})
</script>

<template>
  <Board class="board" :loading="loading">
    <div class="tag-container">
      <RouterLink
        class="tag"
        v-for="tag of tags"
        :key="tag._id"
        :to="{ path: `/tags/${tag._id}`, query: { name: tag.name } }">
        {{ tag.name }}
      </RouterLink>
    </div>
  </Board>
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
