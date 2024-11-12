<script lang="ts" setup>
import Board from '@/layouts/Board.vue'
import Cover from '@/layouts/Cover.vue'

import api from '@/api'
import { Blog, Res } from '@/type'
import { ref } from 'vue'
import dayjs from 'dayjs'
import coverImg from '@/assets/img/3.jpg'

// 分页信息
const pageNum = ref<number>(1)
const pageSize = ref<number>(20)
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
getBlogs()

// 标签、标题、摘要、日期
const blogs = ref<Blog[]>([])
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="60vh" title="博客" />
    <Board class="main">
      <h1>
        共计 <span class="num">{{ total }}</span
        >篇博客
      </h1>
      <ul>
        <RouterLink v-for="blog in blogs" :key="blog._id" class="blog" :to="`/blog/${blog._id}`">
          <span class="time">{{ dayjs(blog.createdTime).format('MM-DD') }}</span>
          <span>{{ blog.title }}</span>
        </RouterLink>
      </ul>
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

    @media (max-width: 660px) {
      width: 100%;
      padding: 30px 20px;
    }

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

      .blog {
        display: flex;
        text-decoration: none;
        transition: all 0.2s;
        padding: 10px 20px;
        border-radius: 6px;
        color: var(--text);
        font-size: 16px;
        gap: 3vw;

        @media (max-width: 660px) {
          padding: 10px 10px;
          font-size: 14px;
        }

        &:hover {
          background-color: var(--content-hover);
        }

        .time {
          color: var(--light-text);
          font-family: consolas;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
