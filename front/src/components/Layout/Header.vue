<script lang="ts" setup>
import Button from '@/components/Base/Button.vue'
import Mask from '@/components/Layout/Mask.vue'
import Search from '@/components/Layout/Search.vue'
import Fab from '@/components/Base/Fab.vue'

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

// 滚动条进度
const progress = ref(0)

// 监听滚动条
window.addEventListener('scroll', () => {
  isTop.value = window.pageYOffset < 64 ? true : false
  progress.value = window.pageYOffset / (document.body.scrollHeight - window.innerHeight)
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
    <Search />
  </header>
  <!-- 移动端窗口 -->
  <section class="left" :style="{ left: showLeft ? '0' : '-320px' }">
    <img class="logo" :src="logo" />
    <Button class="close" @click="showLeft = false">
      <Icon name="close" />
    </Button>
    <ul>
      <li
        v-for="item of items"
        :key="item.name"
        :class="{ active: activeItem === item.link, link: true }">
        <RouterLink @click="showLeft = false" :to="item.link">{{ item.label }}</RouterLink>
      </li>
    </ul>
    <ul class="items">
      <li class="btn" @click="changeTheme($event)">
        <a>
          <Icon v-if="theme === 'dark'" class="icon" name="theme-dark" />
          <Icon v-else class="icon" name="theme-light" />
        </a>
      </li>
      <li class="btn">
        <a href="https://github.com/Moipha/Blog" target="_blank">
          <Icon class="icon" name="github" />
        </a>
      </li>
      <li class="btn">
        <a :href="router.resolve({ path: '/admin' }).href" target="_blank">
          <Icon class="icon" name="manager" />
        </a>
      </li>
    </ul>
  </section>
  <Mask v-model="showLeft" to="body" />
  <Fab :class="{ hide: isTop }" :progress="progress" />
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
  user-select: none;

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
        font-size: 14px;
        padding: 8px 16px;
        text-decoration: none;
        position: relative;
        font-weight: bold;

        &:hover {
          color: var(--active);

          &::before {
            transform: scale(1);
            opacity: 1;
          }
        }

        &::before {
          content: '';
          position: absolute;
          left: 50%;
          translate: -50%;
          bottom: 3px;
          width: calc(100% - 40px);
          height: 3px;
          background-color: var(--active);
          border-radius: 2px;
          transition: 0.25s;
          transform: scale(0);
          opacity: 0;
        }
      }
    }
  }

  .btn-container {
    display: flex;
    gap: clamp(5px, 1vw, 10px);
    margin-left: 5%;
    align-items: center;

    @media (max-width: 660px) {
      display: none;
    }
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
  z-index: 11;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

  .logo {
    width: 100px;
    aspect-ratio: 1;
  }

  .items {
    flex-direction: row;

    .icon {
      font-size: 36px;
    }
  }
}

.active {
  color: var(--active) !important;

  a {
    color: var(--active) !important;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 4px;
      border-radius: 5px;
      background-color: var(--active);
      width: 70%;
      bottom: -6px;
      left: 15%;
    }
  }

  &::before {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
