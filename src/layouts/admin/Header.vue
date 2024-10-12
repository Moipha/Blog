<template>
  <header>
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
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())
</script>

<style lang="scss" scoped>
header {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 10px;

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
}
</style>
