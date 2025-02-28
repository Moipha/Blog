<script lang="ts" setup>
import Cover from '@/components/Layout/Cover.vue'
import Board from '@/components/Layout/Board.vue'
import Avatar from '@/components/Base/Avatar.vue'
import Button from '@/components/Base/Button.vue'

import avatar from '@/assets/img/avatar.webp'
import coverImg from '@/assets/img/6.jpg'
import router from '@/router'

const contacts = [
  {
    url: 'https://github.com/moipha',
    icon: 'github'
  },
  {
    url: 'https://space.bilibili.com/448336859',
    icon: 'bilibili'
  },
  {
    url: 'https://blog.csdn.net/fafafafa_fa',
    icon: 'csdn'
  },
  {
    url: 'mailto:chengfayang@henu.edu.cn',
    icon: 'mail'
  }
]
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="60vh" title="关于" />
    <Board class="board">
      <div class="avatar-wrapper">
        <Avatar :src="avatar" shape="circle" :size="150" />
      </div>
      <h1>Moipha</h1>
      <div class="btn-container">
        <a :href="contact.url" v-for="contact in contacts" :key="contact.url" target="_blank">
          <Button :icon="contact.icon" />
        </a>
      </div>
      <hr />
      <div class="content">
        <div class="btn-container">
          <a href="https://github.com/Moipha/Blog" target="_blank">
            <Button>
              <Icon class="icon" name="github" />
            </Button>
          </a>

          <a :href="router.resolve({ path: '/admin' }).href" target="_blank">
            <Button>
              <Icon class="icon" name="manager" />
            </Button>
          </a>
        </div>
        <h2>关于我</h2>
        <p>一个热爱技术的前端开发者。自23年春学完 Vue 后决定从后端转到前端。将于25年夏毕业。</p>
        <p>
          平时的乐趣就是用代码去实现自己的想法。闲暇时的爱好有台球和骑行。有成为独立游戏开发者的梦想。喜欢听纯音乐，常听各种游戏或影视中的原声带。是东方众，从高二开始接触
          STG。
        </p>
        <p>是一个非常怀旧的人。珍藏了许多能让我回忆起曾经的事物，喜欢看着这些回想过去的时光。</p>
        <p></p>
        <p>没测过 MBTI。</p>
        <hr />
        <h2>关于本博客</h2>
        <p>
          在22年春开始学 Web
          课程的时候就有搭建一个属于自己的博客的想法，不过直到两年半后的24年秋才正式开始。参考了许多博主的博客，有一段时间常在各位的站点上寻找灵感。
        </p>
        <p>
          使用 Vue3 + Node 搭建。开始写这个项目一段时间之后才了解到了 Nuxt
          这个东西，未来我会用它来把本项目重构。
        </p>
        <p>
          没使用博客框架和 UI
          框架。我更希望按自己的意愿来自由地搭建，看着一个页面从无到有会让我感到愉悦。
        </p>
        <hr />
        <h2>关于作品</h2>
      </div>
    </Board>
  </section>
</template>

<style lang="scss" scoped>
.board {
  width: 75%;
  color: var(--light-text);

  .avatar-wrapper {
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1;
    background-color: transparent;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  h1 {
    font-size: 36px;
    font-weight: bolder;
    text-align: center;
    margin-top: 50px;
  }

  hr {
    margin: 30px 0;
  }

  .btn-container {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 30px;

    &::v-deep(.icon) {
      font-size: 20px;
    }
  }

  .content {
    h2 {
      font-weight: bold;
      font-size: 24px;
      line-height: 60px;
    }
    p {
      font-size: 15px;
      margin: 10px 0;
    }
  }
}
</style>
