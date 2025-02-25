<script setup lang="ts">
import Cover from '@/components/Layout/Cover.vue'
import Board from '@/components/Layout/Board.vue'
import Pagination from '@/components/Layout/Admin/Pagination.vue'
import BlogViewList from '@/components/Layout/BlogViewList.vue'

import cover1 from '@/assets/img/summer1.png'
import cover2 from '@/assets/img/summer2.png'
import api from '@/api'
import { Res, Blog } from '@/type'
import { onMounted, ref } from 'vue'

// 分页信息
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

// 获取博客列表
const loading = ref<boolean>(true)
function getBlogs() {
  loading.value = true
  api.blog.get(
    { pageNum: pageNum.value, pageSize: pageSize.value, enable: true, title: '' },
    (res: Res) => {
      blogs.value = res.data.records
      total.value = res.data.total
      loading.value = false
    }
  )
}

// 博客列表
const blogs = ref<Blog[]>([])

onMounted(() => {
  getBlogs()
})

// 随机封面
const coverChoose = Math.random() > 0.5 ? cover1 : cover2

// 下移
function clickDown() {
  window.scrollTo({
    top: window.innerHeight * 1 - 111,
    behavior: 'smooth'
  })
}
</script>

<template>
  <section>
    <Cover class="cover" :src="coverChoose" height="100vh" title="Hi！欢迎来到漾春的博客站点">
      <Icon @click="clickDown" class="down" name="solid-down" />
    </Cover>
    <Board class="board" :loading="loading">
      <template #load>
        <BlogViewList :blogs="blogs" />
      </template>

      <template #footer>
        <Pagination
          class="page"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :total="total"
          @callback="getBlogs" />
      </template>
    </Board>
  </section>
</template>

<style lang="scss" scoped>
section {
  .cover {
    margin-bottom: -64px;
  }
  .board {
    width: 75vw;
    display: flex;
    flex-flow: column nowrap;
    gap: 10vh;
    padding: 10vh 8vw 5vh;
    z-index: 2;
  }
  .page {
    margin-top: 5vh;
    padding: 0;

    &::v-deep(input),
    &::v-deep(.input) {
      background-color: var(--content);
      border-color: var(--back);
    }

    &::v-deep(.active) {
      background-color: var(--active) !important;
    }
    &::v-deep(.block:not(.active)) {
      background-color: var(--content);
      border-color: var(--back);

      &:hover {
        background-color: var(--content-hover) !important;
      }
    }
    &::v-deep(.drop-menu) {
      background-color: var(--content);

      .option-container {
        padding: 0;

        .option {
          &:hover {
            background-color: var(--content-hover);
          }
        }
      }
    }
  }
  .down {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    animation: swing 1s infinite ease-in-out;
    color: var(--white);
    opacity: 0.5;
    cursor: pointer;
    padding: 20px;
    z-index: 1;
  }
  @keyframes swing {
    0%,
    100% {
      bottom: 10px;
    }
    50% {
      bottom: 30px;
    }
  }
}
</style>
