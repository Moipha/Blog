<template>
  <footer>
    <ul class="route">
      <span>导航</span>
      <li>首页</li>
      <li>博客</li>
      <li>代码</li>
      <li>关于</li>
    </ul>
    <div class="visit">访问记录</div>
    <div class="contact">联系方式</div>
  </footer>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
  color: var(--light-text);

  @media (max-width: 660px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5vw;
  }
}
</style>
