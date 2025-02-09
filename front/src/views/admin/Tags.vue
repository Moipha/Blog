<script lang="ts" setup>
import Table from '@/components/admin/Table.vue'
import TableColumn from '@/components/admin/TableColumn.vue'
import Pagination from '@/components/admin/Pagination.vue'
import Input from '@/components/admin/Input.vue'
import Textarea from '@/components/admin/Textarea.vue'
import Button from '@/components/admin/Button.vue'
import Select from '@/components/admin/Select.vue'
import Dialog from '@/layouts/admin/Dialog.vue'
import CreateTag from '@/layouts/admin/CreateTag.vue'
import Confirm from '@/layouts/admin/Confirm.vue'

import { ref, watch } from 'vue'
import api from '@/api'
import { Res, Tag } from '@/type'
import iconToUrl from '@/utils/iconUtil'
import dayjs from 'dayjs'

// 查询条件
const condition = ref<{ type: string; name: string }>({
  type: '',
  name: ''
})

// 分页相关
const pageSize = ref<number>(10)
const pageNum = ref<number>(1)
const total = ref<number>(0)

// 标签列表
const tags = ref<Tag[]>([])

// 查询对应条件的标签
function search() {
  api.tag.get(
    {
      ...condition.value,
      pageSize: pageSize.value,
      pageNum: pageNum.value
    },
    (res: Res) => {
      tags.value = res.data.record
      total.value = res.data.total
    },
    (err: Res) => {
      alert(err.msg)
    }
  )
}

// 发送请求
search()

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
 * 弹窗：添加标签
 */
const dialog = ref<boolean>(false)

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
        placeholder="请输入名称" />
      <Select
        width="200px"
        :style="{ marginRight: '5px' }"
        @change="search"
        v-model="condition.type"
        :options="[
          { label: '请选择类型', value: '' },
          { label: '博客', value: 'blog' },
          { label: '片段', value: 'code' },
          { label: '通用', value: 'general' }
        ]" />
      <Button @click="search" label="搜索" icon="admin-search" />
      <Button @click="reset" label="重置" icon="reset" />
      <Button @click="dialog = true" label="新建标签" icon="add" />
    </form>
    <Table
      align="left"
      class="table"
      height="calc(100vh - 340px)"
      width="calc(80vw - 270px + max(0, 20vw - 200px))"
      :data="tags">
      <TableColumn label="名称" prop="name" :width="100" />
      <TableColumn label="类型" prop="type" :width="40">
        <template #="item">
          {{ map[item.type] }}
        </template>
      </TableColumn>
      <TableColumn label="图标" prop="icon" :width="60">
        <template #="item">
          <div class="table-icon-container">
            <Icon v-if="item.icon" class="table-icon" :url="item.icon" />
            <span v-else>N/A</span>
          </div>
        </template>
      </TableColumn>
      <TableColumn label="创建时间" prop="createdTime" :width="200">
        <template #="item">{{ dayjs(item.createdTime).format('YYYY-MM-DD HH:mm') }}</template>
      </TableColumn>
      <TableColumn label="更新时间" prop="updatedTime" :width="200">
        <template #="item">{{ dayjs(item.updatedTime).format('YYYY-MM-DD HH:mm') }}</template>
      </TableColumn>
      <TableColumn label="操作" #="item" :width="75">
        <div class="action">
          <Button
            text-color="var(--text)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            @click="openEditTag(item)"
            class="btn"
            icon="edit" />
          <Button
            text-color="var(--error)"
            hover-color="var(--border)"
            bg-color="var(--bg)"
            @click="openDeleteTag(item)"
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
  <CreateTag @callback="search" v-model="dialog"></CreateTag>
  <!-- 窗口：修改 -->
  <Dialog v-model="dialog2" title="修改标签">
    <Input placeholder="请输入名称" label="名称" v-model="curTag.name" />
    <label class="dialog-label">类型</label>
    <Select
      v-model="curTag.type"
      width="100%"
      :options="[
        { label: '博客', value: 'blog' },
        { label: '片段', value: 'code' },
        { label: '通用', value: 'general' }
      ]" />
    <div class="icon-container">
      <Textarea
        class="textarea"
        placeholder="请输入 SVG字符串、data:url字符串 或 图片地址"
        label="图标"
        v-model="curTag.icon"
        :decorator="iconToUrl" />
      <div class="effects">
        <label class="dialog-label">预览</label>
        <div class="icon-wrapper">
          <Icon class="temp-icon" :url="iconToUrl(curTag.icon)"></Icon>
        </div>
      </div>
    </div>
    <Button class="dialog-btn" @click="editTag">
      <Icon class="icon" name="edit" />
      <span>修改</span>
    </Button>
  </Dialog>
  <!-- 窗口：确认删除 -->
  <Confirm v-model="dialog3" title="确认删除" @callback="deleteTag">
    <p>
      <span>你确定要删除标签</span>
      <i style="font-weight: bold; margin: 0 5px">{{ dTag.name }}</i>
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
  }

  .table {
    margin-top: 20px;
    font-family: consolas;

    .action {
      display: flex;
      align-items: center;
      gap: 10px;

      .btn {
        height: 40px;
        padding: 10px 11px;
      }
    }
    .table-icon-container {
      display: flex;
      align-items: center;
      padding-left: 5px;

      .table-icon {
        width: 20px;
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
  align-items: center;
  margin-left: auto;
  margin-top: 40px;
  font-size: 14px;

  .icon {
    font-size: 18px;
  }
}

.icon-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;

  .effects {
    display: flex;
    flex-direction: column;

    .icon-wrapper {
      aspect-ratio: 1;
      background-color: var(--bg);
      border: var(--normal-border);
      display: flex;
      border-radius: 10px;

      .temp-icon {
        width: 40px;
        height: 40px;
        margin: auto;
      }
    }
  }
}
</style>
