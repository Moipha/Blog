<template>
  <header
    :style="{
      backdropFilter: isTop ? 'none' : 'blur(10px)',
      backgroundColor: isTop ? 'transparent' : 'var(--bg)',
      borderWidth: isTop ? 0 : '0 0 1px 0'
    }"
  >
    <section class="left" :style="{ left: showLeft ? '0' : '-320px' }">
      <Button class="close" @click="showLeft = false">
        <Icon name="close" />
      </Button>
    </section>
    <Mask v-model="showLeft" to="body" />
    <div class="menu" @click="showLeft = true">
      <Button>
        <Icon class="icon" name="menu" />
      </Button>
    </div>
    <div class="logo">
      Logo
      <h3 class="title">漾春</h3>
    </div>
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
      <a href="https://github.com/Moipha/Blog" target="_blank">
        <Button>
          <Icon class="icon" name="github" />
        </Button>
      </a>
      <Button>
        <Icon class="icon" name="manager" />
      </Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue'
import Mask from '@/components/Mask.vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())

// 侧边栏
const showLeft = ref(false)

// 滚动条是否在顶部
const isTop = ref(true)

// 监听滚动条
window.addEventListener('scroll', () => {
  isTop.value = window.pageYOffset < 64 ? true : false
})
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
  z-index: 10;
  transition: 0.4s background ease;
  border-style: solid;
  border-color: var(--border);

  @media (max-width: 768px) {
    padding: 10px 5%;
  }

  .menu {
    display: none;

    @media (max-width: 660px) {
      display: block;
    }

    .icon {
      font-size: 20px;
    }
  }

  .logo {
    display: flex;
    cursor: pointer;
    align-items: center;

    .title {
      margin-left: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    @media (max-width: 660px) {
      display: none;
    }
  }

  nav {
    margin-left: 5%;
    display: flex;
    align-items: center;

    @media (max-width: 660px) {
      display: none;
    }

    ul {
      display: flex;
      list-style: none;

      li {
        margin: 0;
        cursor: pointer;
        color: var(--light-text);
        transition: all 0.2s ease;
        font-size: 14px;
        padding: 8px 16px;

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

      @media (max-width: 1024px) {
        display: none;
      }
    }

    &:hover {
      --color: var(--text);
    }
  }

  .btn-container {
    display: flex;
    gap: clamp(5px, 1vw, 10px);
    margin-left: 5%;
    align-items: center;

    .icon {
      font-size: 20px;
    }
  }

  .left {
    width: 320px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: var(--bg);
    transition: all 0.3s ease;

    .close {
      font-size: 20px;
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }
}
</style>
