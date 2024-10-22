<template>
  <section>
    <h1>全部文章</h1>
    <ul>
      <RouterLink v-for="blog in blogs" :key="blog.id" class="blog" :to="'/blog/' + blog.id">
        <h2>{{ blog.title }}</h2>
        <span v-for="tag in blog.tags" :key="tag" class="tag">{{ tag }}&nbsp;</span>
        <div class="summary">{{ blog.summary }}</div>
        <div class="time">{{ blog.time }}</div>
      </RouterLink>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 标签、标题、摘要、日期
const blogs = ref([
  {
    id: 1,
    tags: ['js', 'vue'],
    title: '标题1',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-05'
  },
  {
    id: 2,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 3,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 4,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 5,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 6,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 7,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 8,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  },
  {
    id: 9,
    tags: ['css', 'js'],
    title: '标题2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa, rerum est reprehenderit, non culpa inventore similique quam eveniet consequuntur maxime illo ullam voluptatem reiciendis totam soluta natus laudantium! Id!',
    time: '2024-09-01'
  }
])

// 发送请求获取文章列表
</script>

<style lang="scss" scoped>
section {
  background-color: var(--bg);
  color: var(--text);
  padding: 74px 12vw 0;

  @media (max-width: 660px) {
    padding: 74px 3vw 0;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;

    @media (max-width: 660px) {
      margin-left: 20px;
    }
  }

  ul {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5vh 5vw;

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
        background-color: var(--border);
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
</style>
