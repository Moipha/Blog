<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import bus from '@/utils/bus'
const route = useRoute()

const showInput = ref(false)

const input = ref<HTMLInputElement>()
const keyword = ref<string>('')
// 点击搜索按钮
function handleClickSearch() {
  // 打开输入框
  showInput.value = !showInput.value
  if (showInput) {
    setTimeout(() => {
      input.value?.focus()
    }, 10)
  }
}

// 输入框失去焦点时隐藏
function handleBlur() {
  showInput.value = false
}

// 跳转至搜索栏
function jumpToSearch() {
  let path = keyword.value.trim()
  if (path !== '') {
    if (route.fullPath.slice(0, 7) == '/search') {
      bus.emit('search')
    }
    router.push({
      path: '/search',
      query: {
        keyword: path
      }
    })
  }
}
</script>

<template>
  <div class="search" :style="{ width: showInput ? '150px' : '20px' }">
    <span
      class="border"
      :style="{ width: showInput ? '100%' : '0%', left: showInput ? '0%' : '50%' }" />
    <Icon @click="handleClickSearch" class="icon" name="search" />
    <input
      v-model="keyword"
      @keyup.enter="jumpToSearch"
      :disabled="!showInput"
      class="search-input"
      @blur="handleBlur"
      ref="input"
      type="text"
      placeholder="Searching" />
  </div>
</template>

<style lang="scss" scoped>
.search {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: transparent;
  height: 100%;
  transition: all 0.35s ease;
  position: relative;

  .icon {
    flex-shrink: 0;
  }

  .search-input {
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--white);
    width: 100%;
    padding-left: 8px;
    font-size: 16px;

    &::placeholder {
      color: var(--white);
      opacity: 0.7;
    }
  }

  &:hover {
    filter: brightness(1.1);
  }

  .border {
    position: absolute;
    top: -10px;
    height: 3px;
    width: 100%;
    background-color: var(--active);
    z-index: 10;
    transition: all 0.5s ease;
  }
}
</style>
