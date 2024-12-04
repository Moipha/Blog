<script lang="ts" setup>
import Board from '@/layouts/Board.vue'
import Cover from '@/layouts/Cover.vue'
import BlogList from '@/views/BlogList.vue'

import api from '@/api'
import { Blog, Res } from '@/type'
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import coverImg from '@/assets/img/3.jpg'
import Pagination from '@/components/admin/Pagination.vue'

// 分页信息
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

// 加载信息
const loading = ref<boolean>(true)

// 获取博客列表
function getBlogs() {
  loading.value = true
  api.blog.get(
    { pageSize: pageSize.value, pageNum: pageNum.value, title: '', enable: true },
    (res: Res) => {
      blogs.value = res.data.record
      total.value = res.data.total
    },
    (err: Error) => {
      console.log(err)
    },
    () => {
      loading.value = false
    }
  )
}
onMounted(() => {
  getBlogs()
})

// 标签、标题、摘要、日期
const blogs = ref<Blog[]>([])

// 将博客按年份分组
const groupedBlogs = computed(() => {
  const groups: { [year: number]: Blog[] } = {}

  blogs.value.forEach((blog) => {
    // 获取年份
    const year = dayjs(blog.createdTime).year()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(blog)
  })

  // 返回按年份降序排序的分组
  const sortedYears = Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a)

  // 按排序后的年份返回最终的博客分组
  const sortedGroups: { year: number; blogs: Blog[] }[] = sortedYears.map((year) => ({
    year,
    blogs: groups[year]
  }))

  return sortedGroups
})
</script>

<template>
  <section>
    <Cover class="cover" :src="coverImg" height="60vh" title="归档" />
    <BlogList
      class="main"
      :conditions="{
        title: '',
        enable: true,
        tags: []
      }" />
  </section>
</template>

<style lang="scss" scoped>
.main {
  width: 76vw;
  padding: 6vh 7vw;
  margin: auto;
}
</style>
