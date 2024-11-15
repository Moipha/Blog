<script lang="ts" setup>
import Button from '@/components/admin/Button.vue'
import dayjs from 'dayjs'
import { ref } from 'vue'

// 计算上午下午晚上等
const time = parseInt(dayjs().format('HH'))
const timeStr = ref<string>('')
if (time >= 0 && time < 12) {
  timeStr.value = '上午'
} else if (time >= 12 && time < 18) {
  timeStr.value = '下午'
} else {
  timeStr.value = '晚上'
}
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <h1>{{ timeStr }}好，欢迎使用博客管理系统</h1>
      <p>你可能想🤔</p>
      <div class="btn-container">
        <RouterLink to="/admin/tags">
          <Button label="创建标签" icon="tag" />
        </RouterLink>
        <RouterLink to="/admin/blogs/create">
          <Button label="创建博客" icon="blog" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  padding-top: 20vh;
  justify-content: center;

  .wrapper {
    display: flex;
    flex-flow: column wrap;
    width: fit-content;
    gap: 15px;

    h1 {
      font-size: 30px;
    }
    p {
      font-size: 18px;
      color: var(--light-text);
    }

    .btn-container {
      display: flex;
      flex-flow: row wrap;
      gap: 10px;

      a {
        text-decoration: none;
      }
    }
  }
}
</style>
