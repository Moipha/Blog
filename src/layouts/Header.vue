<template>
  <header
    :style="{
      backdropFilter: isTop ? 'none' : 'blur(10px)',
      backgroundColor: isTop ? 'transparent' : 'var(--bg)',
      borderWidth: isTop ? 0 : '0 0 1px 0'
    }"
  >
    <!-- 移动端 -->
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
    <!-- pc端 -->
    <RouterLink to="/home" class="logo" @click="activeItem = '/home'">
      Logo
      <h3 class="title">漾春</h3>
    </RouterLink>
    <nav>
      <ul>
        <RouterLink
          v-for="item in items"
          :key="item.name"
          :to="item.link"
          :class="{ active: activeItem === item.link, link: true }"
          @click="activeItem = item.link"
        >
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
      <Button @click="changeTheme">
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
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue'
import Mask from '@/components/Mask.vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
  { name: 'blog', link: '/blog', label: '博客' },
  { name: 'code', link: '/code', label: '代码' },
  { name: 'about', link: '/about', label: '关于' }
]
// 根据当前路由判断选项是否为激活状态
const activeItem = ref()
activeItem.value = router.currentRoute.value.fullPath
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
    align-items: center;
    color: var(--text);
    text-decoration: none;

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

      .link {
        margin: 0;
        cursor: pointer;
        color: var(--light-text);
        transition: all 0.2s ease;
        font-size: 14px;
        padding: 8px 16px;
        text-decoration: none;

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
