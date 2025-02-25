<script lang="ts" setup>
import Image from '@/components/Base/Image.vue'
import { Blog } from '@/type'
import { useSessionStore } from '@/stores/session'
import dayjs from 'dayjs'
import defaultCover from '@/assets/img/summer1.png'

const { setCurBlog } = useSessionStore()

defineProps<{
  blogs: Blog[]
}>()
</script>

<template>
  <div class="blogs">
    <div class="blog" v-for="blog of blogs" :key="blog._id">
      <RouterLink @click="setCurBlog(blog)" class="img-link" :to="`/blog/${blog._id}`">
        <Image class="img" :src="blog.cover || defaultCover" />
      </RouterLink>
      <div class="info">
        <RouterLink @click="setCurBlog(blog)" class="link" :to="`/blog/${blog._id}`">
          <h2>{{ blog.title }}</h2>
        </RouterLink>
        <div class="tag-container">
          <Icon class="icon" name="tags" />
          <span class="tag" v-for="tag of blog.tags" :key="tag._id">
            <RouterLink class="link" :to="{ path: `/tags/${tag._id}`, query: { name: tag.name } }">
              {{ tag.name }}
            </RouterLink>
          </span>
        </div>
        <RouterLink @click="setCurBlog(blog)" class="link" :to="`/blog/${blog._id}`">
          <p>{{ blog.desc }}</p>
        </RouterLink>
        <div class="detail">
          <div class="date-container">
            <Icon name="eye" />
            <span>{{ blog.viewCount }}</span>
          </div>
          <div class="date-container">
            <Icon name="liked" />
            <span>{{ blog.likeCount }}</span>
          </div>
          <div class="date-container">
            <Icon name="date" />
            <span>{{ dayjs(blog.createdTime).format('YYYY-MM-DD') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blogs {
  display: flex;
  flex-direction: column;
  gap: 10vh;
}

.blog {
  display: flex;
  gap: 30px;

  @media (max-width: 660px) {
    flex-flow: column;
  }

  .img-link {
    display: flex;
    justify-content: center;

    .img {
      width: 240px;
      height: 150px;
      margin-top: 10px;
      object-fit: cover;
      aspect-ratio: 16/10;
      object-position: center;
      border-radius: 10px;
      box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
      transition: 0.3s ease all;

      &:hover {
        box-shadow: 5px 12px 15px 0 rgba(0, 0, 0, 0.24), 5px 17px 30px 0 rgba(0, 0, 0, 0.19);
        scale: 1.01;
      }

      @media (max-width: 660px) {
        width: 100%;
      }
    }
  }

  .info {
    display: flex;
    flex-flow: column wrap;
    color: var(--light-text);
    gap: 8px;

    .link {
      color: var(--light-text);
      text-decoration: none;
      transition: 0.3s ease color;

      &:hover {
        color: var(--active);
      }
    }

    h2 {
      font-size: 26px;
      font-weight: bold;
    }

    .detail {
      display: flex;
      gap: 0 15px;
      flex-flow: row wrap;

      .date-container {
        display: flex;
        align-items: center;
        gap: 5px;
        font-family: consolas;
      }
    }
  }

  .tag-container {
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    gap: 0 8px;
    font-family: consolas;
    font-size: 18px;

    .tag {
      cursor: default;
      font-family: consolas;
      font-size: 14px;
      align-items: center;
      display: flex;

      &::before {
        content: '#';
        font-size: 20px;
        margin-right: 2px;
      }
    }

    .icon {
      font-size: 22px;
    }
  }
}
</style>
