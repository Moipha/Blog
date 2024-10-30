<script lang="ts" setup>
import Table from '@/components/admin/Table.vue'
import TableColumn from '@/components/admin/TableColumn.vue'
import Input from '@/components/admin/Input.vue'
import Button from '@/components/admin/Button.vue'
import Pagination from '@/components/admin/Pagination.vue'

import { ref, watch } from 'vue'
import { Blog, Res } from '@/type'
import format from '@/utils/timeFormatUtil'
import api from '@/api'

// 博客
const blogs = ref<Blog[]>([])

// 查询条件
const condition = ref({
  title: '',
  tags: []
})

// 分页相关
const pageSize = ref<number>(10)
const pageNum = ref<number>(1)
const total = ref<number>(0)

// 切换页码重新查询
watch(pageNum, () => {
  search()
})
watch(pageSize, () => {
  search()
})

// 条件分页查询
function search() {
  api.blog.get(
    {
      ...condition.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    },
    (res: Res) => {
      blogs.value = res.data.record
      total.value = res.data.total
    },
    (err: Error) => {
      console.log(err)
    }
  )
}
search()

// 重置查询条件
function reset() {
  condition.value = { title: '', tags: [] }
}
</script>

<template>
  <div class="container">
    <h1>博客</h1>
    <form onsubmit="return false">
      <Input
        class="input"
        @keydown.enter="search"
        v-model="condition.title"
        placeholder="请输入标题" />
      <Button @click="search" label="搜索" icon="admin-search" />
      <Button @click="reset" label="重置" icon="reset" />
      <Button @click="" label="新建博客" icon="add" />
    </form>
    <Table class="table" height="calc(100vh - 340px)" :data="blogs">
      <TableColumn label="标题" prop="title" :width="200" />
      <TableColumn label="作者" prop="author" :width="80" />
      <TableColumn label="标签" prop="tags" :width="100">
        <template #="item">
          <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </template>
      </TableColumn>
      <TableColumn label="启用状态" prop="icon" :width="80">
        <template #="item"> // TODO radio </template>
      </TableColumn>
      <TableColumn label="创建时间" prop="createdTime" :width="240">
        <template #="item">{{ format(item.createdTime) }}</template>
      </TableColumn>
      <TableColumn label="更新时间" prop="updatedTime" :width="240">
        <template #="item">{{ format(item.updatedTime) }}</template>
      </TableColumn>
      <TableColumn label="操作" #="item" :width="150">
        <div class="action">
          <Button
            text-color="var(--text)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            class="btn"
            icon="edit" />
          <Button
            text-color="var(--text)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            class="btn"
            icon="edit" />
          <Button
            text-color="var(--error)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            class="btn"
            icon="delete" />
        </div>
      </TableColumn>
      <template #footer>
        <Pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :total="total" />
      </template>
    </Table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  h1 {
    font-size: 30px;
  }

  form {
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 10px;

    .input {
      width: 18vw;
      min-width: 200px;
      margin-right: 10px;
    }
  }

  .table {
    margin-top: 20px;
    font-family: consolas;

    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .btn {
        height: 40px;
        padding: 10px 11px;
      }
    }
    .table-icon-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .table-icon {
        width: 20px;
      }
    }
  }
}
</style>
