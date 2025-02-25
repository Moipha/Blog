<script lang="ts" setup>
import { onActivated, ref, watchEffect } from 'vue'
import cover from '@/assets/img/4.jpg'
import digitalMask from '@/assets/img/digital_mask.svg'

const props = defineProps({
  src: String,
  height: { type: String, default: '70vh' },
  title: String,
  mask: { type: Boolean, default: false }
})

// 图片加载
const loaded = ref<boolean>(false)

// 逐字输入的标题
const temp = ref<string[]>([''])
let timer = null

onActivated(() => {
  temp.value = ['']
  typeTitle(props.title)
})

watchEffect(() => {
  temp.value = ['']
  if (props.title) {
    typeTitle(props.title)
  }
})
// 键入标题
function typeTitle(val: string) {
  if (timer) clearInterval(timer)
  temp.value = []

  if (val && val.length !== 0) {
    let time = 100
    if (val.length > 15) time = 60
    let index = 0
    timer = setInterval(() => {
      temp.value.push(val[index++])
      if (index >= val.length) {
        clearInterval(timer)
        timer = null
      }
    }, time)
  }
}
</script>

<template>
  <div class="cover-bg" :style="{ height, '--len': title?.length }">
    <em v-if="mask" class="digital_mask"></em>
    <img
      class="lazyload"
      :data-src="src || cover"
      alt="cover"
      :style="{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }"
      @load="loaded = true" />
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
  background-color: var(--nav);
  overflow: hidden;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(var(--brightness));
    transition: opacity 1s ease-out, scale 1.2s ease, filter 0.5s ease;
    -webkit-user-drag: none;
  }

  .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5), 1px 1px 5px rgba(0, 0, 0, 0.2);

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

em.digital_mask {
  content: '';
  width: 100%;
  height: 100%;
  background: url('https://fafafafa.site:8082/pic/file/1740306643096_digital_mask.svg') repeat
    center center / 3px 3px;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
}
</style>
