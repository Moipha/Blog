<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: String,
  height: { type: String, default: '70vh' },
  title: { type: String }
})

let timer = null

// 逐字输入的标题
const temp = ref<string[]>([''])
watch(
  () => props.title,
  (val) => {
    if (timer) clearInterval(timer)
    temp.value = []

    if (val && val.length !== 0) {
      let time = 120
      if (val.length > 15) time = 80
      let index = 0
      timer = setInterval(() => {
        temp.value.push(val[index++])
        if (index >= val.length) {
          clearInterval(timer)
          timer = null
        }
      }, time)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="cover-bg" :style="{ height, '--len': title?.length }">
    <img :src="src" alt="cover" />
    <div class="slot">
      <h1>{{ temp.join('') }}<span class="caret">_</span></h1>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover-bg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 16px;
  margin-bottom: -100px;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(var(--brightness));
    -webkit-user-drag: none;
  }

  .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    h1 {
      font-size: 36px;
      margin-bottom: 1vh;
      max-width: 80vw;
      text-align: center;
      position: relative;
      user-select: none;

      @media (max-width: 660px) {
        font-size: calc(5vw + 8px);
      }

      .caret {
        animation: blink-caret 0.7s ease infinite;
        margin-left: 3px;
      }
    }
    @keyframes blink-caret {
      from,
      to {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
  }
}
</style>
