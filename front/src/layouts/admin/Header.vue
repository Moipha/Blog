<script lang="ts" setup>
import avatar from '@/assets/img/avatar.webp'
import Avatar from '@/components/Avatar.vue'
import Button from '@/components/admin/Button.vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())

// 面包屑
const route = useRoute()
const breadcrumbs = computed(() => {
  const items = []
  route.matched.forEach((route) => {
    if (route.meta && route.meta.title) {
      items.push(route)
    }
  })
  return items
})
</script>

<template>
  <header>
    <nav>
      <div class="container" v-for="(item, index) of breadcrumbs" :key="item.path">
        <RouterLink
          class="item"
          :class="{
            normal: index == breadcrumbs.length - 1
          }"
          :to="item.path"
          >{{ item.meta.title }}</RouterLink
        >
        <span v-if="index !== breadcrumbs.length - 1" class="split"> > </span>
      </div>
    </nav>
    <Button
      class="theme"
      @click="changeTheme"
      :icon="theme === 'dark' ? 'theme-dark' : 'theme-light'"
      bg-color="var(--bg)"
      text-color="var(--text)"
      hover-color="var(--border)" />
    <Button
      class="avatar-container"
      bg-color="var(--bg)"
      text-color="var(--text)"
      hover-color="var(--border)">
      <Avatar class="avatar" :src="avatar" shape="circle" :size="25" />
    </Button>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 62px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px 20px 0 50px;

  .theme {
    margin: 0 1vw 0 auto;
    padding: 10px;
    aspect-ratio: 1;

    * {
      margin: auto;
      font-size: 20px;
    }
  }

  .avatar-container {
    padding: 7.5px !important;

    .avatar {
      display: flex;
      margin: auto;
    }
  }

  nav {
    display: flex;
    align-items: center;
    align-self: flex-end;

    .container {
      height: 25px;

      .item {
        color: var(--light-text);
        transition: 0.1s color;
        cursor: pointer;
        text-decoration: none;
        font-size: 15px;

        &:hover {
          color: var(--text);
        }
      }

      .normal {
        cursor: default;
        color: var(--text);
      }

      .split {
        margin-left: 0.5vw;
        margin-right: 1vw;
        cursor: default;
        font-family: consolas;
        color: var(--light-text);
        font-size: 16px;
      }
    }
  }
}
</style>
