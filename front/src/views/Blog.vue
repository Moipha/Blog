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
import coverImg from '@/assets/img/4.jpg'
import router from '@/router'
import highlight from '@bytemd/plugin-highlight'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const blog = ref<Blog>({} as Blog)

// 获取博客详情
function getBlog() {
  api.blog.getById(
    props.id,
    (res: Res) => {
      blog.value = res.data
    },
    (err: Error) => {
      console.log(err)
    }
  )
}
onActivated(() => {
  getBlog()
})

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

// 插件
const plugins = [highlight()]
</script>

<template>
  <section>
    <Cover class="cover-bg" :src="coverImg" :title="blog.title">
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
        <span>99 次</span>
      </div>
    </Cover>
    <div class="content">
      <div class="aside">
        <div class="catalog-container">
          <div class="title">
            <Icon class="icon" name="catalog" />
            <span>目录</span>
          </div>
          <Catalog v-if="blog.content" :data="blog.content" />
        </div>
      </div>

      <Board class="board">
        <Viewer :value="blog.content" :plugins="plugins" />
        <div class="footer">
          <span>本文最后更新于 {{ dayjs(blog.updatedTime).format('YYYY年M月D日HH时mm分') }}</span>
          <span>by {{ blog.author }}</span>
        </div>
      </Board>
      <div class="aside">
        <div class="btn-container">
          <Button @click="router.go(-1)" class="btn" icon="return" />
          <Button v-if="Math.random() > 0.5" class="btn" icon="like" />
          <Button v-else class="btn" icon="liked" />
          <Button @click="goFoot" class="btn" icon="comment" />
          <Button class="btn" icon="share" />
          <Button @click="goTop" class="btn" icon="top" />
        </div>
      </div>
    </div>
    <Board id="comment" class="board comment-container">
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
      margin-top: 50px;
      margin-left: 30px;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      position: sticky;
      top: 25vh;
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
      width: fit-content;
      min-width: 10vw;
      margin-top: 40px;
      margin-left: 10px;
      margin-right: 10px;
      float: right;
      display: flex;
      flex-flow: column nowrap;
      position: sticky;
      top: 80px;
      color: var(--text);
      gap: 10px;

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
