<script lang="ts" setup></script>

<template>
  <div class="spinner">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  margin: 5vh auto;
  height: 60px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: var(--text);
  height: 100%;
  width: 8px;
  display: inline-block;
  margin: 3px;
  border-radius: 4px;

  animation: sk-stretchdelay 1s infinite ease-in-out;
}

.spinner .rect1 {
  animation-delay: -0.8s;
}

.spinner .rect2 {
  animation-delay: -0.6s;
}

.spinner .rect3 {
  animation-delay: -0.4s;
}

.spinner .rect4 {
  animation-delay: -0.2s;
}

.spinner .rect5 {
  animation-delay: 0s;
}

@keyframes sk-stretchdelay {
  0%,
  80%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  40% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
