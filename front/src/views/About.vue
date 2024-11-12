<script lang="ts" setup>
import Cover from '@/layouts/Cover.vue'
import Board from '@/layouts/Board.vue'
import Avatar from '@/components/Avatar.vue'
import Button from '@/components/Button.vue'

import avatar from '@/assets/img/avatar.webp'
import coverImg from '@/assets/img/6.jpg'

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

  .btn-container {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 30px;

    &::v-deep(.icon) {
      font-size: 20px;
    }
  }
}
</style>
