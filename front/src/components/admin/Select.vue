<script lang="ts" setup>
// TODO
/**
 * - [ ] 乱成一锅粥了 有空优化一下格式
 * - [ ] 太多any了 处理一下类型问题
 * - [✔] 回显问题
 */
import Input from '@/components/admin/Input.vue'
import Tag from '@/components/admin/Tag.vue'

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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

// 已选中的选项对象
const selectedOption: object | object[] = computed(() => {
  if (props.multiple) {
    return props.options
      .filter((item: any) => (choice.value as string[]).includes(item.value._id))
      .map((item: any) => item.value)
  } else {
    return props.options.find((item: any) => item.value === choice.value)
  }
})
// 显示下拉菜单
const isMenuVisible = ref<boolean>(false)

// 切换显示状态
function toggleMenu() {
  if (!isMenuVisible.value) {
    checkMenuPosition()
  }
  isMenuVisible.value = !isMenuVisible.value
}

// 单选模式选择
function selectOption(option: { label: string; value: number | string }) {
  choice.value = option.value
  emits('change')
  isMenuVisible.value = false
}

const menuHeight = ref<number>(0)

// 点击事件
onMounted(() => {
  // 绑定点击事件：点击页面其他地方关闭下拉菜单
  document.addEventListener('click', handleClick)
  // 判断下拉菜单弹出位置
  isMenuVisible.value = true
  nextTick(() => {
    // 隐藏菜单
    menu.value.style.visibility = 'hidden'

    menuHeight.value = menu.value.offsetHeight
    isMenuVisible.value = false
    menu.value.style.visibility = 'visible'
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})

function handleClick(e: Event) {
  if (!menu.value?.contains(e.target as Node) && !input.value?.contains(e.target as Node)) {
    isMenuVisible.value = false
  }
}

// 多选模式：过滤器
const filter = ref<string>('')
const filteredOptions = ref([])

// 多选模式选择
function selectMultiple(option: { label: string; value: { _id: string } }) {
  const optionId = option.value._id

  // 判断是否已经选中
  const choiceIndex = (choice.value as string[]).indexOf(optionId)

  if (choiceIndex > -1) {
    // 如果已选中，取消选择
    ;(choice.value as string[]).splice(choiceIndex, 1)
  } else {
    // 如果未选中，则添加到选择项
    if ((choice.value as string[]).length >= 5) {
      alert('最多只能选择5个标签')
      return
    }
    ;(choice.value as string[]).push(optionId)
  }
}

// 清除多选项
function clearOption() {
  choice.value = []
}

// 输入框改变则重新进行过滤
watch(filter, (val) => {
  // 忽略大小写模糊查询
  if (!val) return (filteredOptions.value = props.options)
  filteredOptions.value = props.options.filter((item: { label: string; value: any }) =>
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

// 弹窗从哪边出来
const onBottom = ref<boolean>(false)
// 计算下拉菜单是否应从上方弹出
function checkMenuPosition() {
  nextTick(() => {
    const inputElement = input.value
    if (inputElement) {
      // 获取 input 和 drop-menu 的位置和高度
      const inputRect = inputElement.getBoundingClientRect()

      const windowHeight = window.innerHeight

      // 判断下拉菜单是否会超出页面底部
      if (inputRect.bottom + menuHeight.value > windowHeight) {
        onBottom.value = false
      } else {
        onBottom.value = true
      }
    }
  })
}
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
        v-if="!selectedOption || (selectedOption as object[]).length === 0"
        class="placeholder"
        >{{ placeholder }}</span
      >
      <div class="tag-container">
        <template v-if="multiple">
          <Tag v-for="item of selectedOption" :key="(item as any)._id" :icon="(item as any).icon">
            <span>{{ (item as any).name }}</span>
          </Tag>
        </template>
        <span v-else>{{ (selectedOption as any).label }}</span>
      </div>
      <Icon v-if="multiple" class="close" name="input-close" @click.stop="clearOption" />
      <Icon :data-show="isMenuVisible" name="dropdown" class="drop-icon" />
    </div>
    <Transition :name="onBottom ? 'fade-bottom' : 'fade-top'">
      <div
        ref="menu"
        v-if="isMenuVisible"
        :style="{
          width: optionWidth,
          top: onBottom ? '100%' : 'auto',
          bottom: onBottom ? 'auto' : 'calc(100% + 5px)'
        }"
        class="drop-menu">
        <template v-if="multiple">
          <Input icon="search" no-border v-model="filter" placeholder="输入标签名进行搜索" />
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
            <li class="empty" v-if="filteredOptions.length === 0">无查询结果</li>
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
    border: var(--normal-border);
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
  border: var(--normal-border);
  border-radius: 10px;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  z-index: 1;
  margin-top: 5px;
  overflow: hidden;

  .option-container {
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--light-text) var(--table-hover);
    padding: 4px;

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
    border-top: var(--normal-border);
    transform: scale(1.1, 1);
  }
}

/* 从下方弹出的动画 */
.fade-bottom-enter-active,
.fade-bottom-leave-active,
.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.2s ease;
}

.fade-bottom-enter-from,
.fade-bottom-leave-to {
  scale: 0.9;
  opacity: 0;
  transform: translateY(-20px);
}

.fade-bottom-enter-to,
.fade-bottom-leave-from,
.fade-top-enter-to,
.fade-top-leave-from {
  scale: 1;
  opacity: 1;
  transform: translateY(0);
}

/* 从上方弹出的动画 */

.fade-top-enter-from,
.fade-top-leave-to {
  scale: 0.9;
  opacity: 0;
  transform: translateY(20px);
}
</style>
