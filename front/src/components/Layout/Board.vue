<script lang="ts" setup>
import Loading from '@/components/Base/Loading.vue'
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

// 上边距
const marginTop = ref<number>(64 - window.scrollY * 0.2 > 0 ? 64 - window.scrollY * 0.2 : 0)

// 滚动事件处理函数
function handleScroll() {
  marginTop.value = 64 - window.scrollY * 0.2 > 0 ? 64 - window.scrollY * 0.2 : 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="board" :style="{ marginTop: marginTop + 'px' }">
    <slot name="header" />
    <Loading class="loading" v-if="loading" />
    <template v-else>
      <slot name="load" />
      <slot name="default" />
    </template>
    <slot name="footer" />
  </div>
</template>

<style lang="scss" scoped>
.board {
  margin: 0 auto;
  padding: 5vh 5vw;
  background-color: var(--content);
  position: relative;
  border-radius: 10px;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  z-index: 2;

  @media (max-width: 660px) {
    width: 100% !important;
    padding: 30px 20px;
    border-radius: 0;
  }

  .loading {
    margin-bottom: 10vh;
  }
}
</style>
