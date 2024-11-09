<script lang="ts" setup>
import Board from '@/layouts/Board.vue'
import { Viewer } from '@bytemd/vue-next'
import Cover from '@/layouts/Cover.vue'
import Catalog from '@/layouts/Catalog.vue'

import api from '@/api'
import { Blog, Res } from '@/type'
import { ref } from 'vue'
import dayjs from 'dayjs'
import coverImg from '@/assets/img/4.jpg'

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
getBlog()
</script>

<template>
  <section>
    <Cover class="bg" :src="coverImg">
      <h1>{{ blog.title }}</h1>
      <div class="tags">
        <Icon class="icon" name="tags" />
        <span class="tag" v-for="tag in blog.tags" :key="tag._id">{{ tag.name }}</span>
      </div>
      <div class="time">
        <Icon name="date" />
        <span>{{ dayjs(blog.createdTime).format('YYYY年MM月DD日') }}</span>
        <Icon name="clock" />
        <span>{{ dayjs(blog.createdTime).format('HH:mm') }}</span>
      </div>
      <div class="data">
        <Icon name="chart" />
        <span>{{ blog.content?.length }}</span>
        <Icon name="timer" />
        <span>{{ (blog.content?.length / 225).toFixed(0) }} 分钟</span>
        <Icon name="eye" />
        <span>99 次</span>
      </div>
    </Cover>
    <div class="content">
      <div class="left"></div>
      <Board class="board">
        <Viewer :value="blog.content" />
      </Board>
      <div class="right">
        <div class="catalog-container">
          <div class="title">
            <Icon class="icon" name="catalog" />
            <span>目录</span>
          </div>
          <Catalog v-if="blog.content" :data="blog.content" />
        </div>
      </div>
    </div>
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

  .bg {
    h1 {
      font-size: 36px;
      margin-bottom: 1vh;
      max-width: 80vw;
      text-align: center;

      @media (max-width: 660px) {
        font-size: calc(5vw + 8px);
      }
    }

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

  .content {
    display: flex;

    .left,
    .right {
      z-index: 1;
      flex: 1;
      padding-top: 100px;

      @media (max-width: 660px) {
        display: none;
      }
    }

    .right {
      .catalog-container {
        margin-top: 40px;
        margin-left: 20px;
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

          .icon {
            font-size: 30px;
          }
        }
      }
    }

    .board {
      width: 62vw;

      @media (max-width: 660px) {
        width: 100%;
      }
    }
  }
}
</style>
