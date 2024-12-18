<script setup lang="ts">
import Cover from '@/layouts/Cover.vue'
import Board from '@/layouts/Board.vue'
import Pagination from '@/components/admin/Pagination.vue'
import Image from '@/components/Image.vue'

import cover1 from '@/assets/img/summer1.png'
import cover2 from '@/assets/img/summer2.png'
import api from '@/api'
import { Res, Blog } from '@/type'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useSessionStore } from '@/stores/session'

const { setCurBlog } = useSessionStore()

// 分页信息
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

// 获取博客列表
const loading = ref<boolean>(true)
function getBlogs() {
  api.blog.get(
    { pageNum: pageNum.value, pageSize: pageSize.value, enable: true, title: '' },
    (res: Res) => {
      blogs.value = res.data.record
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
    <Board class="board" :loading="blogs.length === 0">
      <div class="blog" v-for="blog of blogs">
        <RouterLink @click="setCurBlog(blog)" class="img-link" :to="`/blog/${blog._id}`">
          <Image class="img" :src="blog.cover || coverChoose" />
        </RouterLink>
        <div class="info">
          <RouterLink @click="setCurBlog(blog)" class="link" :to="`/blog/${blog._id}`">
            <h2>{{ blog.title }}</h2>
          </RouterLink>
          <RouterLink @click="setCurBlog(blog)" class="link" :to="`/blog/${blog._id}`">
            <p>{{ blog.desc }}</p>
          </RouterLink>
          <div class="detail">
            <div class="date-container">
              <Icon name="date" />
              <span>{{ dayjs(blog.createdTime).format('YYYY-MM-DD') }}</span>
            </div>
            <div class="tag-container">
              <Icon name="tag" />

              <span class="tag" v-for="tag of blog.tags" :key="tag._id">
                <RouterLink
                  class="link"
                  :to="{ path: `/tags/${tag._id}`, query: { name: tag.name } }">
                  {{ tag.name }}
                </RouterLink>
              </span>
            </div>
          </div>
        </div>
      </div>
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

    .blog {
      display: flex;
      gap: 30px;

      @media (max-width: 660px) {
        flex-flow: column;
      }

      .img-link {
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
          width: 240px;
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
            gap: 8px;
            font-family: consolas;
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
