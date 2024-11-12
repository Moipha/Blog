<script setup>
import Cover from '@/layouts/Cover.vue'

import coverImg from '@/assets/img/2.jpg'
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="100vh" title="H！欢迎来到漾春的博客站点" />
    <!-- <div class="bg">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
    <div class="top-content">
      <div class="info">
        <Avatar :src="avatar" shape="circle" :size="100" />
        <div class="introduce">
          <p class="title">Hello，我是漾春，一名前端开发工程师</p>
          <p class="subtitle">欢迎来到我的博客。我在这里记录我的日常</p>
        </div>
      </div>
      <div class="link">
        <a v-for="contact of contacts" :key="contact.icon" target="_blank" :href="contact.url">
          <Button class="btn">
            <Icon class="icon" :name="contact.icon" />
          </Button>
        </a>
      </div>
      <Icon class="arrow" name="down" />
    </div> -->
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .bg {
    width: 120vw;
    height: 120vh;
    padding: 10vh 10vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    filter: blur(70px);

    .wave {
      scale: 1.2;
      border-radius: 40%;
      animation: wave 5000ms infinite linear;
      position: absolute;
      width: calc(80vw + 1000px);
      height: calc(120vh + 1000px);
      opacity: 0.6;
      left: 0;
      top: 0;
      margin-left: -25%;
      margin-top: 20%;
      background: var(--cover);

      &:nth-child(2),
      &:nth-child(3) {
        top: 210px;
      }

      &:nth-child(2) {
        animation-duration: 6000ms;
      }

      &:nth-child(3) {
        animation-duration: 7000ms;
      }
    }
  }

  .top-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 2;
    gap: 3vh;

    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      @media (max-width: 660px) {
        flex-direction: column;
        gap: 5vh;
      }

      .introduce {
        margin-left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: var(--text);
        position: relative;
        z-index: 1;

        @media (max-width: 660px) {
          align-items: center;
          margin-left: 0;

          .title {
            font-size: calc(10px + 1.4vw) !important;
          }

          .subtitle {
            font-size: calc(8px + 1.12vw) !important;
          }
        }

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

    .link {
      z-index: 1;
      color: var(--text);
      display: flex;
      gap: clamp(5px, 1vw, 10px);

      .btn {
        padding: 7.5px !important;

        .icon {
          font-size: 25px;
        }
      }
    }

    .arrow {
      position: absolute;
      bottom: 3vh;
      z-index: 5;
      font-size: 40px;
      color: var(--light-text);
      transition: 0.2s ease all;
      cursor: pointer;

      &:hover {
        color: var(--text);
      }

      @media (max-width: 660px) {
        font-size: calc(20px + 2.75vw);
      }
    }
  }
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
