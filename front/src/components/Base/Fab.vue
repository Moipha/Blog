<script lang="ts" setup>
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
const { changeTheme } = useSettingStore()
const { theme } = storeToRefs(useSettingStore())

defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
// 滚动条至顶部
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
// 滚动条至底部
function scrollBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div style="user-select: none">
    <div class="ball" :class="$attrs.class" :style="{ '--progress': progress }">
      {{ (progress * 100).toFixed(0) }}%
    </div>
    <div class="container">
      <div @click="scrollTop" class="btn btn1">顶</div>
      <div @click="changeTheme($event)" class="btn btn2">
        <Icon v-if="theme === 'dark'" name="theme-dark" />
        <Icon v-else name="theme-light" />
      </div>
      <div @click="scrollBottom" class="btn btn3">底</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 10;

  .btn {
    color: var(--light-text);
    font-size: 14px;
    position: fixed;
    bottom: 32px;
    right: 32px;
    background-color: var(--content);
    width: 36px;
    aspect-ratio: 1;
    text-align: center;
    line-height: 36px;
    transition: all 0.3s, background 0s, color 0s;
    opacity: 1;
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

    &:hover {
      background-color: var(--active);
      color: var(--bg);
    }
  }
  .btn1 {
    transform: translate(0px, -60px);
  }
  .btn2 {
    transform: translate(-50px, -50px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  .btn3 {
    transform: translate(-60px);
  }
}

.ball {
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--text);
  font-size: 20px;
  font-family: consolas;

  width: 60px;
  height: 60px;
  background-color: var(--content);
  border-radius: 50%;
  opacity: 1;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.3s, opacity 0.5s;

  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 11;

  background: linear-gradient(
    to top,
    var(--active) calc(var(--progress) * 100%),
    var(--content) calc(var(--progress) * 100%)
  );

  &.hide {
    opacity: 0;
    bottom: 0px;
  }
}

.hide + .container .btn {
  opacity: 0;
  transform: translate(0px, 0px);
  bottom: 10px;
}
</style>
