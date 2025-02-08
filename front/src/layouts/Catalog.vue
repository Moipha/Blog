<script lang="ts" setup>
import { generateCatalog } from '@/utils/catalogUtil'
import { nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cloneDeep, findIndex, throttle } from 'lodash'

const props = defineProps({
  data: String
})
// 目录结构
const catalog = ref<{ text: string; level: number }[]>()
const minLevel = ref<number>(10)
// 生效的目录项
const active = ref<number>(0)

// 给Viewer中的标题绑定id
function bindId() {
  let tempCatalog = cloneDeep(catalog.value)
  const dom = document.querySelector('.markdown-body')
  let children = dom.children
  if (children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const tagName = children[i].tagName
      if (tagName === 'H1' || tagName === 'H2' || tagName === 'H3') {
        const index = findIndex(
          tempCatalog,
          (v: any) => v.text === children[i].textContent && v.level !== 0
        )
        tempCatalog[index].level = 0
        if (index >= 0) {
          children[i].setAttribute('id', `head-${index}`)
        }
      }
    }
  }
}

// 更新目录的方法
function updateCatalog() {
  const result = generateCatalog(props.data)
  if (result) {
    catalog.value = result.catalog
    minLevel.value = result.minLevel
  }
  nextTick(() => {
    bindId()
  })
}

// 滚动事件回调：更新当前激活的目录项
const onScroll = throttle(() => {
  const dom = document.querySelector('.markdown-body')
  if (dom) {
    const headings = Array.from(dom.querySelectorAll('h1, h2, h3'))
    let closestIndex = 0
    let minDistance = Infinity

    headings.forEach((heading, index) => {
      const distance = Math.abs(heading.getBoundingClientRect().top)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    active.value = closestIndex
  }
}, 100)

// 点击目录跳转
function locateHead(index: number) {
  nextTick(() => {
    const targetElement = document.querySelector(`#head-${index}`)
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: offsetTop - 48,
        behavior: 'smooth'
      })
    }
  })
}

onMounted(() => {
  updateCatalog()
  document.addEventListener('scroll', onScroll)
})
onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScroll)
})

watch(
  () => props.data,
  () => {
    updateCatalog()
  }
)
</script>

<template>
  <ul class="container">
    <li
      @click="locateHead(index)"
      class="option"
      :class="[`level-${item.level - minLevel + 1}`, { active: active === index }]"
      v-for="(item, index) of catalog">
      {{ item.text }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.container {
  font-size: 15px;
  height: calc(100vh - 48px - 80px);
  overflow-y: hidden;
  border-top: 1.5px solid var(--border);

  // 滚动条整体部分
  &::-webkit-scrollbar {
    width: 10px;
    background-color: var(--back);
  }

  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  &::-webkit-scrollbar-thumb {
    background-color: var(--active);
    cursor: pointer;
    border-radius: 4px;
  }
  &:hover {
    overflow-y: auto;
  }

  .option {
    list-style: none;
    color: var(--light-text);
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-right: 20px;
    border-radius: 4px;

    &:hover {
      color: var(--text);
      background-color: var(--back-hover);
    }
  }

  @for $i from 1 through 3 {
    .level-#{$i} {
      padding-left: ($i - 1) * 15px + 20px;
      font-size: calc(16px - ($i - 1) * 1px);
      margin-bottom: 2px - ($i - 1) * 1px;
    }
    .level-#{$i}.active {
      color: var(--active);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: (($i - 1) * 15 + 5px);
        top: 20%;
        z-index: 1;
        width: 2px;
        height: 100%;
        height: 60%;
        background-color: var(--active);
        border-radius: 3px;
      }

      &:hover {
        color: var(--active);
      }
    }
  }
}
</style>
