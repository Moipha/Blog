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
  api.blog.get({ pageSize: pageSize.value, pageNum: pageNum.value, title: '' }, (res: Res) => {
    blogs.value = res.data.record
    total.value = res.data.total
  })
}
getBlogs()

// 标签、标题、摘要、日期
const blogs = ref<Blog[]>([])
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="60vh">
      <h1>博客</h1>
    </Cover>
    <Board class="main">
      <h1>
        共计 <span class="num">{{ total }}</span
        >篇博客
      </h1>
      <ul>
        <RouterLink v-for="blog in blogs" :key="blog._id" class="blog" :to="`/blog/${blog._id}`">
          <h2>{{ blog.title }}</h2>
          <span v-for="tag in blog.tags" :key="tag._id" class="tag">{{ tag.name }}&nbsp;</span>
          <div class="summary">{{ blog.desc }}</div>
          <div class="time">{{ dayjs(blog.createdTime).format('MM-DD') }}</div>
        </RouterLink>
      </ul>
    </Board>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: var(--back);
  color: var(--text);

  .cover {
    h1 {
      font-size: 36px;
      text-align: center;
    }
  }

  .main {
    width: 76vw;
    padding: 6vh 7vw;
    margin: auto;

    h1 {
      font-size: 24px;
      font-weight: bold;

      @media (max-width: 660px) {
        margin-left: 20px;
      }

      span {
        margin: 0 5px;
        font-weight: bold;
      }
    }

    ul {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5vh 3vw;

      @media (max-width: 660px) {
        grid-template-columns: 1fr;
        gap: 5vh;
      }

      .blog {
        text-decoration: none;
        transition: all 0.2s;
        padding: 10px 20px;
        border-radius: 12px;
        color: var(--text);

        &:hover {
          background-color: var(--content-hover);
        }

        h2 {
          margin-bottom: 5px;
        }

        .tag {
          font-family: consolas;
          color: var(--light-text);

          &::before {
            content: '#';
          }
        }

        .summary {
          color: var(--light-text);
          font-size: 16px;
          margin: 5px 0 10px;
        }

        .time {
          color: var(--light-text);
          font-family: consolas;
        }
      }
    }
  }
}
</style>
