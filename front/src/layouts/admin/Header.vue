<template>
  <header>
    <nav>
      <template v-if="$route.name !== '首页'">
        <RouterLink class="item" to="/admin">首页</RouterLink>
        <span class="split"> / </span>
        <a>{{ $route.name }}</a>
      </template>
      <template v-else>
        <a to="/admin">首页</a>
      </template>
    </nav>
    <Button class="theme" @click="changeTheme">
      <Icon v-if="theme === 'dark'" class="icon" name="theme-dark" />
      <Icon v-else class="icon" name="theme-light" />
    </Button>
    <Button class="avatar-container">
      <Avatar class="avatar" :src="avatar" shape="circle" :size="25" />
    </Button>
  </header>
</template>

<script lang="ts" setup>
import avatar from '@/assets/img/avatar.webp'
import Avatar from '@/components/Avatar.vue'
import Button from '@/components/Button.vue'
import { useSettingStore } from '../../stores/setting'
import { storeToRefs } from 'pinia'

const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())
</script>

<style lang="scss" scoped>
header {
  height: 42px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .theme {
    margin: 0 1vw 0 auto;
    font-size: 20px;
  }

  .avatar-container {
    padding: 7.5px !important;

    .avatar {
      display: flex;
      margin: auto;
    }
  }

  nav {
    align-self: flex-end;

    .item {
      color: var(--light-text);
      transition: 0.1s color;
      cursor: pointer;

      &:hover {
        color: var(--text);
      }
    }

    a {
      text-decoration: none;
      font-size: 15px;
      cursor: default;
    }

    .split {
      margin: 0 0.5vw;
      cursor: default;
    }
  }
}
</style>
