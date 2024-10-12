<template>
  <aside>
    <div class="logo">
      <h1>logo</h1>
      <p class="text">后台管理</p>
    </div>
    <ul>
      <li>
        <Button class="btn"><Icon name="home" /></Button>
        首页
      </li>
      <li>
        <Button class="btn">
          <Icon name="graph" />
        </Button>
        统计
      </li>
      <li>
        <Button class="btn">
          <Icon name="tag" />
        </Button>
        标签
      </li>
      <li>
        <Button class="btn">
          <Icon name="blog" />
        </Button>
        博客
      </li>
      <li>
        <Button class="btn">
          <Icon name="code" />
        </Button>
        代码
      </li>
    </ul>
    <Button class="exit">
      <Icon name="exit" />
      <span class="text">退出登录</span>
    </Button>
  </aside>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue'
</script>

<style lang="scss" scoped>
aside {
  width: 20vw;
  min-width: 200px;
  height: 100vh;
  color: var(--bg);
  background-color: var(--text);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .logo {
    text-align: center;

    .text {
      font-weight: bold;
      font-size: 20px;
    }
  }

  ul {
    color: var(--bg);
    display: flex;
    flex-direction: column;
    gap: 3vh;

    li {
      list-style: none;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 12px;

      &:hover {
        cursor: pointer;
      }

      .btn {
        color: var(--bg);
        background-color: var(--hover);
        border-color: var(--hover);
        font-size: 16px;
      }
    }
  }

  .exit {
    width: 60%;
    min-width: 140px;
    color: var(--bg);
    background-color: var(--text);
    border-color: var(--light-text);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    gap: 10px;

    .text {
      font-weight: bold;
      font-size: 14px;
    }

    &:hover {
      background-color: var(--hover);
    }
  }
}
</style>
