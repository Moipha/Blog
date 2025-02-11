<script lang="ts" setup>
import Table from '@/components/Base/Admin/Table/Table.vue'
import TableColumn from '@/components/Base/Admin/Table/TableColumn.vue'
import Input from '@/components/Base/Admin/Input.vue'
import Button from '@/components/Base/Admin/Button.vue'
import Pagination from '@/components/Layout/Admin/Pagination.vue'
import Tag from '@/components/Base/Admin/Tag.vue'
import Switch from '@/components/Base/Admin/Switch.vue'
import Confirm from '@/components/Base/Admin/Confirm.vue'

import { ref, watch } from 'vue'
import { Blog, Res } from '@/type'
import api from '@/api'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
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
    (err: Res) => {
      alert(err.msg)
    }
  )
}
search()

// 重置查询条件
function reset() {
  condition.value = { title: '', tags: [] }
  search()
}

// 跳转到博客页面
function jumpToBlog(id: string) {
  const { href } = router.resolve({ path: `/blog/${id}` })
  window.open(href, '_blank')
}

// 删除窗口
const dialogDelete = ref<boolean>(false)
// 将要删除的博客
const delBlog = ref<Blog>({} as Blog)
// 删除博客
function deleteBlog() {
  api.blog.delete(delBlog.value._id, (res: Res) => {
    alert('删除成功')
    search()
  })
}
// 打开删除窗口
function openDelete(blog: Blog) {
  delBlog.value = blog
  dialogDelete.value = true
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
      <RouterLink to="/admin/blogs/create" class="link">
        <Button label="新建博客" icon="add" />
      </RouterLink>
    </form>
    <Table
      class="table"
      width="calc(80vw - 270px + max(0, 20vw - 200px))"
      height="calc(100vh - 340px)"
      :data="blogs"
      align="left">
      <TableColumn label="标题" prop="title" :width="250" />
      <TableColumn label="作者" prop="author" :width="80" />
      <TableColumn label="标签" prop="tags" :width="220">
        <template #="item">
          <div class="tag-container">
            <Tag :icon="tag.icon" :label="tag.name" v-for="tag in item.tags" :key="tag._id" />
          </div>
        </template>
      </TableColumn>
      <TableColumn label="发布状态" prop="icon" :width="80">
        <template #="item">
          <div class="switch-container">
            <Switch v-model="item.enable" />
          </div>
        </template>
      </TableColumn>
      <TableColumn label="创建时间" prop="createdTime" :width="150">
        <template #="item">{{ dayjs(item.createdTime).format('YYYY-MM-DD HH:mm') }}</template>
      </TableColumn>
      <TableColumn label="更新时间" prop="updatedTime" :width="150">
        <template #="item">{{ dayjs(item.updatedTime).format('YYYY-MM-DD HH:mm') }}</template>
      </TableColumn>
      <TableColumn label="操作" #="item" :width="150">
        <div class="action">
          <Button
            @click="jumpToBlog(item._id)"
            text-color="var(--text)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            class="btn"
            icon="eye" />
          <Button
            @click="
              router.push({
                name: 'editBlog',
                params: { id: item._id }
              })
            "
            text-color="var(--text)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            class="btn"
            icon="edit" />
          <Button
            @click="openDelete(item)"
            text-color="var(--error)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            class="btn"
            icon="delete" />
        </div>
      </TableColumn>
      <template #footer>
        <Pagination
          @callback="search"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :total="total" />
      </template>
    </Table>
  </div>
  <Confirm v-model="dialogDelete" @callback="deleteBlog" title="确认删除">
    <p>
      <span>你确定要删除博客</span>
      <i :style="{ margin: '0 5px', fontWeight: 'bold' }">{{ delBlog.title }}</i>
      <span>吗？</span>
    </p>
  </Confirm>
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

    .link {
      text-decoration: none;
    }
  }

  .table {
    margin-top: 20px;
    font-family: consolas;

    .action {
      display: flex;
      align-items: center;
      gap: 5px;

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

    .tag-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2px 5px;
    }

    .switch-container {
      display: flex;
      align-items: center;
      width: fit-content;
    }
  }
}
</style>
