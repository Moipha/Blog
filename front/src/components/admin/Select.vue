// TODO 1. 乱成一锅粥了 有空优化一下格式 2. 太多any了 有时间处理一下类型问题

<script lang="ts" setup>
import Input from '@/components/admin/Input.vue'
import Tag from '@/components/admin/Tag.vue'

import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  width: {
    type: String,
    default: 'fit-content'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  optionWidth: {
    type: String,
    default: '100%'
  }
})
const emits = defineEmits(['change'])

// ref
const menu = ref<HTMLElement>()
const input = ref<HTMLElement>()

// 返回选值
const choice = defineModel<string | number | string[]>()

// 当前选中的选项
const selectedOption = ref<string | object[]>()
if (props.multiple) {
  selectedOption.value = []
  choice.value = []
} else {
  selectedOption.value = props.options[0] ? (props.options[0] as any).label : ''
  choice.value = props.options[0] ? (props.options[0] as any).value : ''
}

// 显示下拉菜单
const isMenuVisible = ref<boolean>(false)

// 切换显示状态
function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
}

// 进行选择
function selectOption(option: { label: string; value: number | string }) {
  selectedOption.value = option.label
  choice.value = option.value
  emits('change')
  isMenuVisible.value = false
}

// 添加点击事件
onMounted(() => {
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})

function handleClick(e: Event) {
  if (
    !menu.value?.contains(e.target as Node) &&
    !input.value?.contains(e.target as Node)
  ) {
    isMenuVisible.value = false
  }
}

// 多选模式：过滤器
const filter = ref<string>('')
const filteredOptions = ref([])

// 选择多选选项
function selectMultiple(option: { label: string; value: { _id: string } }) {
  const optionId = option.value._id

  // 判断是否已经选中
  const choiceIndex = (choice.value as string[]).indexOf(optionId)

  if (choiceIndex > -1) {
    // 如果已选中，取消选择
    ;(choice.value as string[]).splice(choiceIndex, 1)
    const selectedIndex = (selectedOption.value as object[]).findIndex(
      (item: any) => item._id === optionId
    )
    if (selectedIndex > -1) {
      ;(selectedOption.value as object[]).splice(selectedIndex, 1)
    }
  } else {
    // 如果未选中，则添加到选择项
    if ((choice.value as string[]).length >= 5) {
      alert('最多只能选择5个标签')
      return
    }
    ;(choice.value as string[]).push(optionId)
    ;(selectedOption.value as object[]).push(option.value)
  }
}

// 清除多选项
function clearOption() {
  choice.value = []
  selectedOption.value = []
}

// 输入框改变则重新进行过滤
watch(filter, (val) => {
  // 忽略大小写模糊查询
  if (!val) return (filteredOptions.value = props.options)
  filteredOptions.value = props.options.filter(
    (item: { label: string; value: any }) =>
      item.label.toLowerCase().includes(val.toLowerCase())
  )
})
// 确保能渲染异步获取的选项
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = [...newOptions]
  },
  { immediate: true }
)
</script>

<template>
  <div class="container">
    <div
      ref="input"
      @click="toggleMenu"
      :style="{ ...($attrs.style as any), width: width }"
      :data-show="isMenuVisible"
      class="input">
      <span
        v-if="!selectedOption || selectedOption.length === 0"
        class="placeholder"
        >{{ placeholder }}</span
      >
      <div class="tag-container">
        <template v-if="multiple">
          <Tag
            v-for="item of selectedOption"
            :key="(item as any)._id"
            :icon="(item as any).icon">
            <span>{{ (item as any).name }}</span>
          </Tag>
        </template>
        <span v-else>{{ selectedOption }}</span>
      </div>
      <Icon
        v-if="multiple"
        class="close"
        name="input-close"
        @click.stop="clearOption" />
      <Icon :data-show="isMenuVisible" name="dropdown" class="drop-icon" />
    </div>
    <Transition name="fade">
      <div
        ref="menu"
        v-show="isMenuVisible"
        :style="{ width: optionWidth }"
        class="drop-menu">
        <template v-if="multiple">
          <Input
            icon="search"
            no-border
            v-model="filter"
            placeholder="输入标签名进行搜索" />
          <div class="hr" />
          <div class="option-container scrollbar">
            <li
              class="option multiple-option"
              :class="{selected: (choice as string[]).includes((option as any).value._id)}"
              v-for="option in filteredOptions"
              :key="(option as any).value"
              @click="selectMultiple(option as any)">
              {{ (option as any).label }}
            </li>
            <li class="empty" v-if="filteredOptions.length === 0">
              无查询结果
            </li>
          </div>
        </template>
        <template v-else>
          <div class="option-container scrollbar">
            <li
              class="option"
              v-for="option in options"
              :key="(option as any).value"
              @click="selectOption(option as any)">
              {{ (option as any).label }}
            </li>
            <li class="empty" v-if="options.length === 0">无查询结果</li>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;

  .input {
    width: 100%;
    height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    outline: none;
    transition: 0.2s ease all;
    cursor: pointer;
    border: solid 1.5px var(--border);
    border-radius: 10px;
    background-color: var(--bg);
    color: var(--text);
    font-size: 13.5px;

    &[data-show='true'] {
      border-color: var(--text);
    }

    .close {
      position: absolute;
      right: 25px;
      color: var(--light-text);
      font-size: 14px;
      top: 50%;
      transform: translateY(-50%);
      padding: 10px;

      &:hover {
        color: var(--text);
      }
    }

    .drop-icon[data-show='true'] {
      transform-origin: center;
      transform: rotate(180deg) translateY(60%);
    }

    .drop-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-40%);
      font-size: 12px;
      color: var(--light-text);
      transition: 0.2s ease all;
    }

    .placeholder {
      color: var(--light-text);
    }
    .tag-container {
      display: flex;
      gap: 5px;
    }
  }
}

.drop-menu {
  position: absolute;
  background-color: var(--bg);
  border: solid 1.5px var(--border);
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 5px;
  padding: 4px;
  overflow: hidden;

  .option-container {
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--light-text) var(--table-hover);
    padding-top: 5px;

    .option {
      color: black;
      padding: 5px 10px;
      text-decoration: none;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--text);
      border-radius: 5px;

      &:hover {
        background-color: var(--border);
      }
    }
    .empty {
      text-align: center;
      padding: 20px 10px;
      text-decoration: none;
      list-style: none;
    }

    .multiple-option {
      padding-left: 45px;
    }

    .selected {
      position: relative;

      &::before {
        content: '√';
        position: absolute;
        font-size: 20px;
        font-family: consolas;
        left: 15px;
      }
    }
  }
  .hr {
    border-top: 1.5px solid var(--border);
    transform: scale(1.1, 1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  scale: 0.9;
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-to,
.fade-leave-from {
  scale: 1;
  opacity: 1;
  transform: translateY(0);
}
</style>
