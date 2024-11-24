<script lang="ts" setup>
import Button from '@/components/Button.vue'
import Mask from '@/components/Mask.vue'

import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import bus from '@/utils/bus'
import logo from '@/assets/img/y.png'

const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())
const router = useRouter()

// 侧边栏
const showLeft = ref(false)

// 滚动条是否在顶部
const isTop = ref(true)

// 监听滚动条
window.addEventListener('scroll', () => {
  isTop.value = window.pageYOffset < 64 ? true : false
})

// 导航栏渲染
const items = [
  { name: 'home', link: '/home', label: '主页' },
  { name: 'blog', link: '/blog', label: '归档' },
  { name: 'tag', link: '/tags', label: '标签' },
  { name: 'about', link: '/about', label: '关于' }
]
// 根据当前路由判断选项是否为激活状态
const activeItem = ref()
activeItem.value = router.currentRoute.value.fullPath

bus.on('change-nav', (route) => {
  activeItem.value = route
})

onBeforeUnmount(() => {
  bus.off('change-nav')
})
</script>

<template>
  <header
    :style="{
      backdropFilter: isTop ? 'none' : 'blur(3px)',
      backgroundColor: isTop ? 'transparent' : 'var(--nav)',
      height: isTop ? '72px' : '48px'
    }">
    <div class="menu" @click="showLeft = true">
      <Button>
        <Icon class="icon" name="menu" />
      </Button>
    </div>
    <!-- pc端 -->
    <RouterLink to="/home" class="logo" @click="activeItem = '/home'">
      <img :src="logo" />
      <h3 class="title">漾春</h3>
    </RouterLink>
    <nav>
      <ul>
        <RouterLink
          v-for="item in items"
          :key="item.name"
          :to="item.link"
          :class="{ active: activeItem === item.link, link: true }">
          {{ item.label }}
        </RouterLink>
      </ul>
    </nav>
    <div class="search">
      <Icon class="icon" name="search" />
      <span class="text">搜索</span>
      <span class="label">Ctrl K</span>
    </div>
    <div class="btn-container">
      <Button @click="changeTheme($event)">
        <Icon v-if="theme === 'dark'" class="icon" name="theme-dark" />
        <Icon v-else class="icon" name="theme-light" />
      </Button>
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
  </header>
  <!-- 移动端窗口 -->
  <section class="left" :style="{ left: showLeft ? '0' : '-320px' }">
    <Button class="close" @click="showLeft = false">
      <Icon name="close" />
    </Button>
    <ul>
      <li v-for="item of items" :key="item.name">
        <RouterLink @click="showLeft = false" :to="item.link">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </section>
  <Mask v-model="showLeft" to="body" />
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  height: 72px;
  width: 100%;
  padding: 10px 10%;
  display: flex;
  align-items: center;
  color: var(--white);
  top: 0;
  z-index: 4;
  transition: 0.4s all ease;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    padding: 10px 5%;
  }

  .menu {
    display: none;

    @media (max-width: 660px) {
      display: block;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    color: var(--white);
    text-decoration: none;
    gap: 5px;

    .title {
      font-weight: bold;
      letter-spacing: 1px;
    }

    @media (max-width: 660px) {
      display: none;
    }

    img {
      width: 40px;
      aspect-ratio: 1;
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

      .link {
        margin: 0;
        cursor: pointer;
        color: var(--white);
        transition: all 0.2s ease;
        font-size: 14px;
        padding: 8px 16px;
        text-decoration: none;

        &:hover {
          color: var(--active);
        }
      }

      .active {
        color: var(--active);
        font-weight: bold;
      }
    }
  }

  .search {
    --color: var(--white);
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color);
    cursor: pointer;
    transition: all 0.2s ease;

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
      filter: brightness(0.8);
    }
  }

  .btn-container {
    display: flex;
    gap: clamp(5px, 1vw, 10px);
    margin-left: 5%;
    align-items: center;
  }

  .icon {
    font-size: 20px;
    color: var(--white);
  }
}

.left {
  min-width: min(320px, 100%);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--back);
  transition: all 0.3s ease;
  z-index: 6;

  display: flex;
  justify-content: center;
  align-items: center;

  .close {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 20px;
  }

  ul {
    list-style: none;
    display: flex;
    flex-flow: column;
    gap: 5vh;
    a {
      text-decoration: none;
      color: var(--text);
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
