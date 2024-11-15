<script lang="ts" setup>
import Board from '@/layouts/Board.vue'
import Cover from '@/layouts/Cover.vue'

import api from '@/api'
import { Blog, Res } from '@/type'
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import coverImg from '@/assets/img/3.jpg'
import Pagination from '@/components/admin/Pagination.vue'

// 分页信息
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

// 获取博客列表
function getBlogs() {
  api.blog.get(
    { pageSize: pageSize.value, pageNum: pageNum.value, title: '', enable: true },
    (res: Res) => {
      blogs.value = res.data.record
      total.value = res.data.total
    }
  )
}
onMounted(() => {
  getBlogs()
})

// 标签、标题、摘要、日期
const blogs = ref<Blog[]>([])

// 将博客按年份分组
const groupedBlogs = computed(() => {
  const groups: { [year: number]: Blog[] } = {}

  blogs.value.forEach((blog) => {
    // 获取年份
    const year = dayjs(blog.createdTime).year()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(blog)
  })

  // 返回按年份降序排序的分组
  const sortedYears = Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a)

  // 按排序后的年份返回最终的博客分组
  const sortedGroups: { year: number; blogs: Blog[] }[] = sortedYears.map((year) => ({
    year,
    blogs: groups[year]
  }))

  return sortedGroups
})
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="60vh" title="归档" />
    <Board class="main">
      <h1>
        共计 <span class="num">{{ total }}</span
        >篇博客
      </h1>
      <ul>
        <div class="blog-item" v-for="group in groupedBlogs" :key="group.year">
          <h1>{{ group.year }}</h1>
          <RouterLink
            v-for="blog in group.blogs"
            :key="blog._id"
            class="blog"
            :to="`/blog/${blog._id}`">
            <span class="time">{{ dayjs(blog.createdTime).format('MM-DD') }}</span>
            <span>{{ blog.title }}</span>
          </RouterLink>
        </div>
      </ul>
      <Pagination
        class="page"
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :total="total"
        @callback="getBlogs" />
    </Board>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: var(--back);
  color: var(--text);

  .main {
    width: 76vw;
    padding: 6vh 7vw;
    margin: auto;

    h1 {
      font-size: 24px;
      font-weight: bold;

      span {
        margin: 0 5px;
        font-weight: bold;
      }
    }

    .num {
      margin: 0 10px 0 5px;
    }

    ul {
      margin-top: 20px;
      display: flex;
      flex-flow: column;

      .blog-item {
        display: flex;
        flex-flow: column nowrap;

        h1 {
          font-size: 20px;
          margin: 20px 0 5px;
          color: var(--light-text);
          font-weight: 600;
        }

        .blog {
          display: flex;
          text-decoration: none;
          transition: all 0.2s;
          padding: 10px 20px;
          border-radius: 6px;
          color: var(--light-text);
          font-size: 16px;
          gap: 3vw;

          @media (max-width: 660px) {
            padding: 10px 10px;
            font-size: 14px;
          }

          .time {
            font-family: consolas;
            flex-shrink: 0;
          }

          &:hover {
            background-color: var(--content-hover);
            color: var(--active);
          }
        }
      }
    }
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
}
</style>
