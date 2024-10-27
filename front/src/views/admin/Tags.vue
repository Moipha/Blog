<script lang="ts" setup>
import Table from '@/components/admin/Table.vue'
import TableColumn from '@/components/admin/TableColumn.vue'
import Input from '@/components/admin/Input.vue'
import Button from '@/components/admin/Button.vue'
import Select from '@/components/admin/Select.vue'
import Dialog from '@/layouts/admin/Dialog.vue'
import { ref } from 'vue'
import api from '@/api'
import { Res, Tag } from '@/type'

// 查询条件
const condition = ref<{ type: string; name: string }>({
  type: '',
  name: ''
})

// 标签列表
const tags = ref<Tag[]>([])

// 查询对应条件的标签
function search() {
  api.tag.get(
    condition.value,
    (res: Res) => {
      tags.value = res.data
    },
    (err: Error) => {
      console.log(err)
    }
  )
}

// 发送请求
search()

// 处理空值
function format(str: string) {
  return str === undefined || str === '' ? 'N/A' : str
}

// 重置
function reset() {
  condition.value = {
    type: '',
    name: ''
  }
  search()
}

// 映射
const map = {
  general: '通用',
  blog: '博客',
  code: '片段'
}

/**
 * 弹窗：新建标签
 */
const dialog = ref<boolean>(false)
function openDialog() {
  dialog.value = true
}

// 新标签
const newTag = ref<Tag>({} as Tag)

// 新建标签
function createTag() {
  api.tag.create(
    newTag.value,
    (res: Res) => {
      alert('标签创建成功')
      search()
      dialog.value = false
    },
    (err: Error) => {
      alert('标签创建失败' + err)
    }
  )
}

/**
 * 弹窗：修改标签
 */
const dialog2 = ref<boolean>(false)
const curTag = ref<Tag>({} as Tag)

function openEditTag(tag: Tag) {
  curTag.value = { ...tag }
  dialog2.value = true
}

function editTag() {
  api.tag.update(
    curTag.value,
    (res: Res) => {
      alert('标签修改成功')
      search()
      dialog2.value = false
    },
    (err: Error) => {
      alert('标签修改失败' + err)
    }
  )
}
/**
 * 弹窗：确认删除
 */
const dialog3 = ref<boolean>(false)
const dTag = ref<Tag>({} as Tag)
function openDeleteTag(tag: Tag) {
  dTag.value = tag
  dialog3.value = true
}
function deleteTag() {
  api.tag.delete(
    dTag.value._id,
    (res: Res) => {
      alert('标签删除成功')
      search()
      dialog3.value = false
    },
    (err: Error) => {
      alert('标签删除失败' + err)
    }
  )
}
</script>

<template>
  <div class="container">
    <h1>标签</h1>
    <form onsubmit="return false">
      <Input
        class="input"
        @keydown.enter="search"
        v-model="condition.name"
        placeholder="请输入名称"
      />
      <Select class="select" @change="search" v-model="condition.type">
        <option value="">请选择类型</option>
        <option value="blog">博客</option>
        <option value="code">片段</option>
        <option value="general">通用</option>
      </Select>
      <Button @click="search" label="搜索" icon="admin-search" />
      <Button @click="reset" label="重置" icon="reset" />
      <Button @click="openDialog" label="新建标签" icon="add" />
    </form>
    <Table :data="tags">
      <TableColumn label="名称" prop="name" :width="100" />
      <TableColumn label="类型" prop="type" :width="40">
        <template #="item"> {{ map[item.type] }} </template>
      </TableColumn>
      <TableColumn label="图标" prop="icon" :width="60">
        <template #="item"> {{ format(item.icon) }} </template>
      </TableColumn>
      <TableColumn label="创建时间" prop="createdTime" :width="200" />
      <TableColumn label="更新时间" prop="updatedTime" :width="200" />
      <TableColumn label="操作" #="item" :width="100">
        <div class="action">
          <Button
            text-color="var(--text)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            @click="openEditTag(item)"
            class="btn"
            icon="edit"
          />
          <Button
            text-color="var(--error)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            @click="openDeleteTag(item)"
            class="btn"
            icon="delete"
          />
        </div>
      </TableColumn>
    </Table>
    <!-- <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>类型</th>
          <th>图标</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag of tags" :key="tag._id">
          <td>{{ tag.name }}</td>
          <td>{{ map[tag.type] }}</td>
          <td>{{ format(tag.icon) }}</td>
          <td>{{ tag.createdTime }}</td>
          <td>{{ tag.updatedTime }}</td>
          <td class="action"></td>
        </tr>
      </tbody>
    </table> -->
  </div>
  <Dialog v-model="dialog" title="新增标签">
    <Input placeholder="请输入名称" label="名称" v-model="newTag.name" />
    <label class="dialog-label">类型</label>
    <Select v-model="newTag.type">
      <option value="blog">博客</option>
      <option value="code">片段</option>
      <option value="general">通用</option>
    </Select>
    <Input
      placeholder="请输入 SVG字符串、data:url字符串 或 图片地址"
      label="图标"
      v-model="newTag.icon"
    />
    <Button class="dialog-btn" @click="createTag">创建</Button>
  </Dialog>
  <Dialog v-model="dialog2" title="修改标签">
    <Input placeholder="请输入名称" label="名称" v-model="curTag.name" />
    <label class="dialog-label">类型</label>
    <Select v-model="curTag.type">
      <option :selected="curTag.type === 'blog'" value="blog">博客</option>
      <option :selected="curTag.type === 'code'" value="code">片段</option>
      <option :selected="curTag.type === 'general'" value="general">
        通用
      </option>
    </Select>
    <Input
      placeholder="请输入 SVG字符串、data:url字符串 或 图片地址"
      label="图标"
      v-model="curTag.icon"
    />
    <Button class="dialog-btn" @click="editTag">修改</Button>
  </Dialog>
  <Dialog v-model="dialog3" title="确认删除">
    <p class="delete-text">你确定要删除标签 {{ dTag.name }} 吗？</p>
    <div class="btn-group">
      <Button @click="deleteTag">确定删除</Button>
      <Button @click="dialog3 = false">取消</Button>
    </div>
  </Dialog>
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

    .select,
    .input {
      width: 18vw;
      min-width: 200px;
      margin-right: 10px;
    }
  }

  table {
    width: 100%;
    margin-top: 40px;
    border-spacing: 0;
    border: 1.5px solid var(--border);
    border-radius: 10px;

    thead {
      color: var(--light-text);
    }

    td {
      height: 56px;
      border-top: 1.5px solid var(--border);
      text-align: center;
    }

    th {
      height: 40px;
    }

    tr {
      transition: 0.1s all ease;

      &:hover {
        background-color: var(--table-hover);
      }
    }
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
  }
}
.dialog-label {
  margin: 15px 0 10px;
  font-size: 16px;
}
.dialog-btn {
  width: 80px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-top: 40px;
}
.delete-text {
  margin-top: 10px;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}
</style>
