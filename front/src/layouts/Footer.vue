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
    <div class="ba">
      <a target="_blank" href="https://beian.miit.gov.cn/">
        <img :src="img" alt="备案" />
        <span>冀ICP备2023040066号-2</span>
      </a>
      <span>©2024 · 漾春途记</span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import img from '@/assets/img/gongan.png'
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
  color: var(--light-text);
  position: relative;

  @media (max-width: 660px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5vw;
  }

  .ba {
    display: flex;
    position: absolute;
    z-index: 10;
    bottom: 20px;
    gap: 20px;
    align-items: center;
    font-size: 14px;
    font-family: 'Microsoft YaHei';

    a {
      text-decoration: none;
      color: var(--light-text);
      transition: 0.2s all ease;
      display: flex;
      align-items: center;
      gap: 3px;

      img {
        width: 18px;
      }

      &:hover {
        color: var(--text);
      }
    }
  }
}
</style>
