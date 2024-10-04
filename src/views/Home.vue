<template>
  <section>
    <Avatar :src="avatar" shape="circle" :size="100"></Avatar>
    <div class="introduce">
      <p class="title">Hello，我是漾春，一名前端开发工程师</p>
      <p class="subtitle">欢迎来到我的博客。我在这里记录我的日常</p>
    </div>
  </section>
</template>

<script setup>
import Avatar from '@/components/Avatar.vue'
import avatar from '@/assets/img/avatar.webp'
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .introduce {
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--text);

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .subtitle {
      font-size: 16px;
      color: var(--light-text);
    }
  }
}
</style>
