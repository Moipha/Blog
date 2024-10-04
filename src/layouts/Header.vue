<template>
  <header>
    <div class="logo">Logo</div>
    <h3 class="title">漾春</h3>
    <nav>
      <ul>
        <li class="active">首页</li>
        <li>博客</li>
        <li>代码</li>
        <li>关于</li>
      </ul>
    </nav>
    <div class="search">
      <Icon class="icon" name="search" />
      <span class="text">搜索</span>
      <span class="label">Ctrl K</span>
    </div>
    <div class="btn-container">
      <Button @click="changeTheme">
        <Icon v-if="theme === 'dark'" class="icon" name="theme-dark" />
        <Icon v-else class="icon" name="theme-light" />
      </Button>
      <Button @click="openGithubLink">
        <Icon class="icon" name="github" />
      </Button>
      <Button>
        <Icon class="icon" name="manager" />
      </Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())

// 打开github主页
const openGithubLink = () => {
  window.open('https://github.com/Moipha/Blog', '_blank')
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  height: 64px;
  width: 100%;
  padding: 10px 10%;
  display: flex;
  align-items: center;
  color: var(--text);
  top: 0;

  .title {
    margin-left: 10px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  nav {
    margin-left: 5%;
    display: flex;
    align-items: center;

    ul {
      display: flex;
      list-style: none;

      li {
        margin: 0 10px;
        cursor: pointer;
        color: var(--light-text);
        transition: all 0.2s ease;
        font-size: 14px;
        padding: 8px 16px;
        margin: 0;

        &:hover {
          color: var(--text);
          font-weight: bold;
        }
      }

      .active {
        color: var(--text);
        font-weight: bold;
      }
    }
  }

  .search {
    --color: var(--light-text);
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color);
    cursor: pointer;
    transition: all 0.2s ease;

    .icon {
      font-size: 20px;
    }

    .text {
      font-size: 14px;
    }

    .label {
      border: 1px solid var(--color);
      border-radius: 4px;
      font-size: 12px;
      padding: 0 5px;
    }

    &:hover {
      --color: var(--text);
      transform: scale(1.05);
    }
  }

  .btn-container {
    display: flex;
    gap: 10px;
    margin-left: 5%;
    align-items: center;

    .icon {
      font-size: 20px;
    }
  }
}
</style>
