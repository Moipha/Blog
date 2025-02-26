<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Select from '@/components/Base/Admin/Select.vue'
import Input from '@/components/Base/Admin/Input.vue'

const props = defineProps({
  // 总数据量
  total: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['callback'])

const pageSize = defineModel<number>('pageSize')
const currentPage = defineModel<number>('currentPage')
// 总页数
const totalPage = computed(() => {
  return Math.ceil(props.total / pageSize.value)
})
// 修改pageSize后将页码置为1
watch(pageSize, (n, o) => {
  if (n !== o) {
    currentPage.value = 1
    emits('callback')
  }
})

// 切换页码重新查询
watch(currentPage, (n, o) => {
  if (n !== o) {
    emits('callback')
  }
})

// 输入框跳转
const jumpTo = ref<number>()

// 跳转页码
function jumpPage(num: number) {
  currentPage.value = num
}
function changePage(isPlus: boolean) {
  if (isPlus) {
    if (currentPage.value < totalPage.value) {
      currentPage.value++
    }
  } else {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
}
function onEnterJump() {
  if (jumpTo.value < 0) {
    jumpPage(1)
  } else if (jumpTo.value > totalPage.value) {
    jumpPage(totalPage.value)
  } else {
    jumpPage(jumpTo.value)
  }
}
</script>

<template>
  <div class="footer">
    <div class="left">
      显示第<span>{{ currentPage * pageSize - pageSize + 1 }}</span
      >条<span>-</span>第
      <span>{{ currentPage * pageSize > props.total ? props.total : currentPage * pageSize }}</span
      >条，共 <span>{{ total }}</span
      >条
    </div>
    <div class="right">
      <template v-if="totalPage > 1">
        <div class="right-container">
          <div @click="changePage(false)" class="block"><</div>
          <div
            @click="jumpPage(num)"
            class="block"
            v-for="num of totalPage"
            :key="num"
            :class="{
              active: num == currentPage
            }">
            {{ num }}
          </div>
          <div @click="changePage(true)" class="block">></div>
        </div>
        <div class="right-container jump">
          <span>跳转至</span>
          <Input
            width="50px"
            @keydown.enter="onEnterJump"
            v-model.number="jumpTo"
            class="input"
            type="number" />
          <span>页</span>
        </div>
      </template>

      <div class="right-container">
        <span>每页条数</span>
        <Select
          :style="{
            height: '30px',
            padding: '0 5px',
            borderRadius: '4px'
          }"
          width="60px"
          v-model.number="pageSize"
          :options="[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 30, label: '30' }
          ]">
        </Select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  height: 50px;
  padding-right: 10px;
  font-family: consolas;
  color: var(--light-text);
  font-size: 14px;
  flex-flow: row wrap;

  .left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    span {
      font-weight: bold;
      margin: 0 5px;
    }

    @media (max-width: 660px) {
      display: none;
    }
  }
  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 660px) {
      gap: 10px;
      margin: auto;

      .jump {
        display: none !important;
      }
    }

    .right-container {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      align-items: center;

      @media (max-width: 425px) {
        gap: 0px;
      }

      .input {
        :deep(input) {
          height: 30px;
          border-radius: 4px;
        }
      }

      .block {
        height: 30px;
        aspect-ratio: 1;
        border: var(--normal-border);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;

        &:not(.active):hover {
          background-color: var(--border);
        }
      }

      .active {
        background-color: var(--text);
        color: var(--bg);
      }
    }
  }
}
</style>
