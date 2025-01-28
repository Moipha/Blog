<script lang="ts" setup>
import Board from '@/layouts/Board.vue'
import { Viewer } from '@bytemd/vue-next'
import Cover from '@/layouts/Cover.vue'
import Catalog from '@/layouts/Catalog.vue'
import Button from '@/components/Button.vue'

import api from '@/api'
import { Blog, Res } from '@/type'
import { computed, onActivated, ref } from 'vue'
import dayjs from 'dayjs'
import router from '@/router'
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm'
import { useSessionStore } from '@/stores/session'
import { storeToRefs } from 'pinia'

const { curBlog } = storeToRefs(useSessionStore())

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

// 博客信息
const blog = ref<Blog>({} as Blog)

// 加载中
const loading = ref(true)

// 获取博客详情
function getBlog() {
  loading.value = true
  api.blog.getById(
    props.id,
    (res: Res) => {
      blog.value = res.data
    },
    (err: Error) => {
      console.log(err)
    },
    () => {
      loading.value = false
    }
  )
}
// 计算文本量
const wordCount = computed(() => {
  let content: string = ''
  const exceptWords = ["'", ' ', '`', '#', '\n', '*']
  if (blog.value.content) {
    content = blog.value.content
  }
  return content.split('').filter((c: string) => !exceptWords.includes(c)).length
})

// 每分钟阅读量
const RPM: number = 300

// 回到顶部
function goTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
// 跳转到评论
function goFoot() {
  const comment: HTMLElement = document.querySelector('#comment')
  if (comment) {
    window.scrollTo({
      top: comment.offsetTop,
      behavior: 'smooth'
    })
  }
}

// 返回
function handleReturn() {
  if (window.history.state?.back) {
    // 如果有上一个路由，则返回上一个路由
    router.back()
  } else {
    // 如果没有上一个路由，则跳转到 /blog
    router.push('/blog')
  }
}

// 添加访问次数
function addView() {
  api.blog.view(props.id, (res: Res) => {
    if (res.code === 200)
      curBlog.value.viewCount ? curBlog.value.viewCount++ : (curBlog.value.viewCount = 1)
  })
}

// 插件
const plugins = [highlight(), gfm()]

onActivated(() => {
  // 当未通过点击链接（即store中未存储curBlog信息时）跳转至该页面时，发送请求获取该博客详情
  if (!curBlog.value) {
    getBlog()
  } else {
    loading.value = true
    blog.value = curBlog.value
    loading.value = false
  }
  addView()
})
</script>

<template>
  <section>
    <Cover
      :key="loading ? '' : blog._id"
      class="cover-bg"
      :src="loading ? '' : blog.cover"
      :title="loading ? '' : blog.title">
      <div class="tags">
        <Icon class="icon" name="tags" />
        <RouterLink
          v-for="tag in blog.tags"
          :key="tag._id"
          class="tag"
          :to="{ path: `/tags/${tag._id}`, query: { name: tag.name } }">
          {{ tag.name }}
        </RouterLink>
      </div>
      <div class="time">
        <Icon name="date" />
        <span>{{ dayjs(blog.createdTime).format('YYYY年MM月DD日') }}</span>
        <Icon name="clock" />
        <span>{{ dayjs(blog.createdTime).format('HH:mm') }}</span>
      </div>
      <div class="data">
        <Icon name="chart" />
        <span>{{ wordCount }} 字</span>
        <Icon name="timer" />
        <span>{{ (wordCount / RPM).toFixed(0) }} 分钟</span>
        <Icon name="eye" />
        <span>{{ blog.viewCount || 0 }} 次</span>
      </div>
    </Cover>
    <div class="content">
      <div class="aside">
        <div class="btn-container">
          <Button @click="handleReturn" class="btn" icon="return" />
          <Button v-if="Math.random() > 0.5" class="btn" icon="like" />
          <Button v-else class="btn" icon="liked" />
          <Button @click="goFoot" class="btn" icon="comment" />
          <Button class="btn" icon="share" />
          <Button @click="goTop" class="btn" icon="top" />
        </div>
      </div>
      <Board class="board" :loading="blog._id == undefined">
        <Viewer :value="blog.content" :plugins="plugins" />
        <div class="footer">
          <span>本文最后更新于 {{ dayjs(blog.updatedTime).format('YYYY年M月D日HH时mm分') }}</span>
          <span>by {{ blog.author }}</span>
        </div>
      </Board>

      <div class="aside">
        <div class="catalog-container">
          <div class="title">
            <Icon class="icon" name="catalog" />
            <span>目录</span>
          </div>
          <Catalog v-if="blog.content" :data="blog.content" />
        </div>
      </div>
    </div>
    <Board id="comment" class="board comment-container" :loading="blog._id == undefined">
      <h1>评论</h1>
    </Board>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: var(--back);
  color: var(--text);
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;

  .cover-bg {
    .time {
      display: flex;
      font-family: consolas;
      gap: 5px;
      align-items: center;

      :nth-child(2) {
        margin-right: 10px;
      }
    }
    .data {
      display: flex;
      align-items: center;
      gap: 5px;
      span {
        margin-right: 5px;
      }
    }

    .tags {
      display: flex;
      align-items: center;
      gap: 5px;

      .icon {
        font-size: 24px;
      }

      .tag {
        font-family: consolas;
        font-size: 14px;
        align-items: center;
        display: flex;
        text-decoration: none;
        color: var(--white);
        position: relative;

        &::before {
          content: '#';
          font-size: 20px;
          margin-right: 2px;
        }

        &:hover {
          &::after {
            content: '';
            position: absolute;
            bottom: 8px;
            border-bottom: 1.5px solid var(--white);
            z-index: 2;
            width: 100%;
          }
        }
      }
    }
  }

  .content {
    display: flex;

    .aside {
      z-index: 1;
      flex: 1;
      padding-top: 100px;

      @media (max-width: 660px) {
        display: none;
      }
    }

    .btn-container {
      margin-top: 215px;
      margin-right: 30px;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-end;
      position: sticky;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text);
      gap: 20px;

      .btn {
        font-size: 25px;
        width: fit-content;
        color: var(--light-text);
        background-color: var(--content);

        &:hover {
          color: var(--active);
        }
      }
    }

    .catalog-container {
      width: 100%;
      min-width: 10vw;
      margin-top: 50px;
      padding-left: 30px;
      float: right;
      display: flex;
      flex-flow: column nowrap;
      position: sticky;
      top: 80px;
      color: var(--text);
      gap: 10px;
      user-select: none;

      .title {
        display: flex;
        font-size: 22px;
        align-items: center;
        gap: 5px;
        cursor: default;

        .icon {
          font-size: 30px;
        }
      }
    }

    .footer {
      display: flex;
      gap: 10px;
      font-size: 14px;
      font-family: consolas;
      margin-top: 10vh;
      cursor: default;
      background-color: var(--content-hover);
      padding: 12px 20px;
      border-radius: 4px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        background-color: var(--active);
        width: 5px;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
      }
    }
  }
  .board {
    width: 62vw;
    margin-bottom: 25px;

    @media (max-width: 660px) {
      width: 100%;
    }
  }

  .comment-container {
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 0;

    h1 {
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>
