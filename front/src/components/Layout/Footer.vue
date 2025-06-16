<script lang="ts" setup>
import img from '@/assets/img/gongan.png'

import dayjs from 'dayjs'
import { computed } from 'vue'
import router from '@/router'

// 定义启动时间
const startTime = dayjs('2024-11-11 11:11:11')

// 使用计算属性获取时间差
const runningTime = computed(() => {
  const now = dayjs()
  const days = now.diff(startTime, 'day')
  const hours = now.diff(startTime, 'hour') % 24
  const minutes = now.diff(startTime, 'minute') % 60
  return ` ${days} 天 ${hours} 小时 ${minutes} 分钟`
})
</script>

<template>
  <footer>
    <p class="time">本站已运行了{{ runningTime }}</p>
    <div class="links">
      <a href="https://github.com/Moipha/Blog" target="_blank">
        <Icon class="icon" name="github" />
        <span class="text">项目地址</span>
      </a>

      <a :href="router.resolve({ path: '/admin' }).href" target="_blank">
        <Icon class="icon" name="manager" />
        <span class="text">后台管理</span>
      </a>
    </div>
    <div class="ba">
      <a target="_blank" href="https://beian.miit.gov.cn/">
        <img :src="img" alt="备案" />
        <span>冀ICP备2023040066号-2</span>
      </a>
      <span>©2024 · 漾春途记</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 240px;
  color: var(--light-text);
  position: relative;
  padding-bottom: 15px;
  font-family: 'Microsoft YaHei';
  gap: 8px;
  user-select: none;

  @media (max-width: 660px) {
    gap: 4px;
  }

  .time {
    font-size: 12px;

    @media (max-width: 660px) {
      font-size: 10px;
    }
  }

  .ba {
    display: flex;
    bottom: 20px;
    gap: 20px;
    align-items: center;
    font-size: 14px;

    @media (max-width: 660px) {
      font-size: 12px;
    }

    a {
      text-decoration: none;
      color: var(--light-text);
      transition: 0.2s all ease;
      display: flex;
      align-items: center;
      gap: 3px;

      display: flex;

      img {
        width: 18px;
      }

      &:hover {
        color: var(--text);
      }
    }
  }

  .links {
    display: flex;
    gap: 10px;

    a {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 12px;
      color: var(--light-text);
      text-decoration: none;

      .icon {
        font-size: 16px;
      }

      &:hover {
        color: var(--text);
      }
    }
  }
}
</style>
