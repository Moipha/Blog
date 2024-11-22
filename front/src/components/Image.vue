<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  src: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: 'fit-content'
  },
  width: {
    type: String,
    default: 'fit-content'
  }
})
const isLoaded = ref<boolean>(false)
</script>

<template>
  <div class="container">
    <div v-show="!isLoaded" class="loader"></div>
    <img
      @load="isLoaded = true"
      class="lazyload"
      :style="{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }"
      :class="$attrs.class"
      :data-src="src" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--back);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease-out, scale 1.2s ease, filter 0.5s ease;
    position: absolute;
  }

  .loader {
    width: 64px;
    height: 64px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .loader:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    transform: rotate(45deg) translate(30%, 40%);
    background: #7adb90;
    box-shadow: 32px -34px 0 5px #278c3e;
    animation: slide 2s infinite ease-in-out alternate;
  }

  .loader:after {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #278c3e;
    transform: rotate(0deg);
    transform-origin: 35px 145px;
    animation: rotate 2s infinite ease-in-out;
  }

  @keyframes slide {
    0%,
    100% {
      bottom: -35px;
    }

    25%,
    75% {
      bottom: -2px;
    }

    20%,
    80% {
      bottom: 2px;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-15deg);
    }

    25%,
    75% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(25deg);
    }
  }
}
</style>
