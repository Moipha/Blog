<script lang="ts" setup>
const enable = defineModel()
</script>

<template>
  <div class="toggle-switch">
    <input v-model="enable" class="toggle-input" id="toggle" type="checkbox" />
    <label class="toggle-label" for="toggle"></label>
  </div>
</template>

<style lang="scss" scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: auto;

  .toggle-input {
    display: none;
  }

  .toggle-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 24px;
    background-color: var(--border);
    border-radius: 34px;
    cursor: pointer;
    transition: background-color 0.3s;

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background-color: var(--bg);
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s;
    }
  }

  .toggle-input:checked + .toggle-label {
    background-color: var(--text);

    &::before {
      transform: translateX(16px);
    }
  }

  &.light {
    .toggle-label {
      background-color: #bebebe;

      .toggle-input:checked + & {
        background-color: #9b9b9b;

        &::before {
          transform: translateX(6px);
        }
      }
    }
  }

  &.dark {
    .toggle-label {
      background-color: #4b4b4b;

      .toggle-input:checked + & {
        background-color: #717171;

        &::before {
          transform: translateX(16px);
        }
      }
    }
  }
}
</style>
