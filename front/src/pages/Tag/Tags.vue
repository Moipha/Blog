<script lang="ts" setup>
import Board from '@/components/Layout/Board.vue'

import api from '@/api'
import { Res, Tag } from '@/type'
import { inject, onMounted, ref, computed } from 'vue'

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

// 处理标签数据，计算字体大小和颜色
const processedTags = computed(() => {
  if (tags.value.length === 0) return []

  // 提取所有引用次数用于计算大小
  const times = tags.value.map((tag) => tag.times)
  const minTimes = Math.min(...times)
  const maxTimes = Math.max(...times)

  return tags.value.map((tag) => ({
    ...tag,
    fontSize: calculateFontSize(tag.times, minTimes, maxTimes)
  }))
})

// 计算字体大小
const calculateFontSize = (value: number, min: number, max: number) => {
  const minSize = 16 // 最小字体大小
  const maxSize = 48 // 最大字体大小
  return ((value - min) / (max - min)) * (maxSize - minSize) + minSize
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
        v-for="tag of processedTags"
        :key="tag._id"
        :to="{ path: `/tags/${tag._id}`, query: { name: tag.name } }"
        :style="{ fontSize: `${tag.fontSize}px` }">
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
