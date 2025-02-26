<script lang="ts" setup>
import Cover from '@/components/Layout/Cover.vue'
import Board from '@/components/Layout/Board.vue'
import BlogViewList from '@/components/Layout/BlogViewList.vue'
import Pagination from '@/components/Layout/Admin/Pagination.vue'

import searchGif from '@/assets/img/search.gif'
import { onActivated, onBeforeUnmount, onMounted, ref } from 'vue'
import { Blog, Res, Tag } from '@/type'
import { useRoute } from 'vue-router'
import api from '@/api'
import bus from '@/utils/bus'
const route = useRoute()

// 从路由信息中获取搜索关键词
let keyword = route.query.keyword

// 博客列表
const blogs = ref<Blog[]>([])
// 标签列表
const tags = ref<Tag[]>([])

// 分页相关
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

// loading
const loading = ref<boolean>(false)

// 进行模糊查询
async function search() {
  loading.value = true
  await api.blog.search(
    {
      keyword,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    },
    (res: Res) => {
      // 把获取到的博客、标签分开
      const records = res.data.records
      let index = 0
      for (let i = 0; i < records.length; i++) {
        if (records[i].content !== undefined) {
          index = i
          break
        }
      }
      tags.value = records.slice(0, index)
      blogs.value = records.slice(index)
      total.value = res.data.total
    },
    () => {
      loading.value = false
    }
  )
}

onMounted(() => {
  bus.on('search', () => {
    setTimeout(() => {
      keyword = route.query.keyword
      search()
    })
  })
})

onBeforeUnmount(() => {
  bus.off('search')
})
onActivated(() => {
  keyword = route.query.keyword
  search()
})
</script>

<template>
  <Cover
    :src="searchGif"
    :title="`已搜索到 ${total} 个有关 “${keyword}” 的内容`"
    height="80vh"
    mask />
  <Board :loading="loading" v-if="blogs.length > 0" class="board">
    <template #load>
      <template v-if="tags.length > 0">
        <h1>相关标签</h1>
        <div class="tags">
          <RouterLink
            :to="{ path: `/tags/${tag._id}`, query: { name: tag.name } }"
            class="tag"
            v-for="tag in tags"
            :id="tag._id">
            <Icon name="tags" />
            <span class="name">{{ tag.name }}</span>
            <span class="times">共计 {{ tag.times }} 篇文章</span>
          </RouterLink>
        </div>
      </template>
      <template v-if="blogs.length > 0">
        <h1>相关文章</h1>
        <BlogViewList class="blogs" :blogs="blogs" />
      </template>
    </template>
    <template #footer>
      <Pagination
        class="page"
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :total="total"
        @callback="search" />
    </template>
  </Board>
</template>

<style lang="scss" scoped>
.board {
  width: 70vw;
  color: var(--light-text);
  user-select: none;

  h1 {
    font-weight: bold;
    margin: 5vh -1vw 3vh;
  }
}

.tags {
  display: flex;
  flex-direction: column;
  font-size: 16px;

  .icon {
    font-size: 30px;
  }

  .tag {
    display: flex;
    width: 100%;
    color: var(--light-text);
    text-decoration: none;
    align-items: center;
    gap: 20px;
    padding: 10px 20px;
    border-radius: 4px;

    .name {
      flex: 1;
    }
    .times {
      flex: 5;
      font-family: consolas;
    }

    &:hover {
      background-color: var(--content-hover);
      color: var(--active);
    }
  }
}

.page {
  margin-top: 5vh;
  padding: 0;

  &::v-deep(input),
  &::v-deep(.input) {
    background-color: var(--content) !important;
    border-color: var(--back);
  }

  &::v-deep(.active) {
    background-color: var(--active) !important;
  }
  &::v-deep(.block:not(.active)) {
    background-color: var(--content);
    border-color: var(--back);

    &:hover {
      background-color: var(--content-hover) !important;
    }
  }
  &::v-deep(.drop-menu) {
    background-color: var(--content);

    .option-container {
      padding: 0;

      .option {
        &:hover {
          background-color: var(--content-hover);
        }
      }
    }
  }
}

.blogs {
  gap: 5vh;
}
</style>
