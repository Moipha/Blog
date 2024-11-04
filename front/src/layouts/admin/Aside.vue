<template>
  <aside>
    <RouterLink class="logo" to="/">
      <h1>logo</h1>
      <p class="text">后台管理</p>
    </RouterLink>
    <ul>
      <RouterLink
        v-for="item of nav"
        :key="item.name"
        :to="'/admin' + item.path"
        :class="{ active: active === item.path }"
        class="item">
        <Button class="btn">
          <Icon :name="item.icon" />
        </Button>
        <span>{{ item.name }}</span>
      </RouterLink>
    </ul>
    <Button class="exit">
      <Icon name="exit" />
      <span class="text">退出登录</span>
    </Button>
  </aside>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue'
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import bus from '@/utils/bus'

const router = useRouter()

// 当前选项
const active = ref('/home')
const nav = [
  { name: '首页', icon: 'home', path: '/home' },
  { name: '统计', icon: 'graph', path: '/graphs' },
  { name: '标签', icon: 'tag', path: '/tags' },
  { name: '博客', icon: 'blog', path: '/blogs' },
  { name: '代码', icon: 'code', path: '/codes' }
]
active.value = router.currentRoute.value.path.slice(6)

bus.on('change-admin-nav', (route: string) => {
  active.value = route.slice(6)
})
onBeforeUnmount(() => {
  bus.off('change-admin-nav')
})
</script>

<style lang="scss" scoped>
aside {
  width: 15vw;
  min-width: 200px;
  height: 100vh;
  color: var(--bg);
  background-color: var(--text);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .logo {
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    color: var(--bg);

    .text {
      font-weight: bold;
      font-size: 20px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0vh;

    .item {
      padding: 10px 20px;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--bg);

      &:hover {
        cursor: pointer;

        span {
          &::before {
            width: 100%;
          }
        }
      }

      span {
        position: relative;
        font-size: 16px;
        font-weight: bold;

        &::before {
          transition: all 0.2s ease;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background-color: var(--bg);
          border-radius: 4px;
        }
      }

      .btn {
        color: var(--bg);
        background-color: var(--hover);
        border-color: var(--hover);
        font-size: 16px;
      }
    }

    .active {
      .btn {
        background-color: var(--bg);
        color: var(--text);
        border-color: var(--bg);
      }

      // span::before {
      //   width: 100%;
      // }
    }
  }

  .exit {
    width: 60%;
    min-width: 140px;
    color: var(--bg);
    background-color: var(--text);
    border-color: var(--light-text);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    gap: 10px;

    .text {
      font-weight: bold;
      font-size: 14px;
    }

    &:hover {
      background-color: var(--hover);
    }
  }
}
</style>
