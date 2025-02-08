<script lang="ts" setup>
import Input from '@/components/admin/Input.vue'
import Button from '@/components/admin/Button.vue'
import Select from '@/components/admin/Select.vue'
import CreateTag from '@/layouts/admin/CreateTag.vue'
import Switch from '@/components/admin/Switch.vue'
import Confirm from '@/layouts/admin/Confirm.vue'
import Textarea from '@/components/admin/Textarea.vue'
import { Editor } from '@bytemd/vue-next'
import Image from '@/components/Image.vue'
import Upload from '@/components/admin/Upload.vue'

import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
// @ts-ignore
import zhHans from 'bytemd/locales/zh_Hans'
import { ref, onMounted, onUnmounted } from 'vue'
import api from '@/api'
import { Blog, BlogDTO, Res, Tag } from '@/type'
import { useTempStore } from '@/stores/temp'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { cloneDeep } from 'lodash'

// store
const { newBlog } = storeToRefs(useTempStore())

// router
const router = useRouter()

// 标签
const options = ref<Tag[]>([])

// 创建标签窗口
const dialog = ref<boolean>(false)

// 获取全部博客或通用类型的标签
function getTags() {
  api.tag.getAll(
    ['blog', 'general'],
    (res: Res) => {
      options.value = res.data.map((item: Tag) => {
        return { label: item.name, value: item }
      })
    },
    (err: Res) => {
      alert(err.msg)
    }
  )
}
getTags()

// 新建的博客
const blog = ref<BlogDTO>({
  enable: true,
  tags: [],
  author: 'Moipha'
} as BlogDTO)
if (newBlog.value) {
  blog.value = cloneDeep(newBlog.value)
}

// 编辑器插件
const plugins = [gfm(), highlight()]
function handleChange(v: string) {
  blog.value.content = v
}

// 重写
function reset() {
  blog.value = { enable: true, tags: [], author: 'Moipha' } as BlogDTO
  // 清除编辑器内容
  handleChange('')
  // 清除store中的缓存
  newBlog.value = { tags: [], enable: true, author: 'Moipha' } as BlogDTO
}

// 重置弹窗
const dialogReset = ref<boolean>(false)

// 临时保存
function save() {
  newBlog.value = cloneDeep(blog.value)
  alert('保存成功')
}

// 键盘事件处理函数
function handleKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey && event.key === 's') || (event.ctrlKey && event.key === 'S')) {
    event.preventDefault()
    save()
  }
}

// 上传博客
function upload() {
  api.blog.create(
    blog.value,
    (res: Res) => {
      alert('创建成功')
      // 清除缓存
      newBlog.value = { tags: [], enable: true, author: 'Moipha' } as BlogDTO
      createdBlog.value = res.data
      dialogCreate.value = true
    },
    (err: Res) => {
      alert(err.msg)
    }
  )
}

// 上传成功回调窗口
const dialogCreate = ref<boolean>(false)

// 刚创建的博客信息
const createdBlog = ref<Blog>({} as Blog)

// 触发上传窗口
function triggerUpload() {
  uploader.value.upload()
}
// 定义ref
const uploader = ref(null)

// 成功创建回调
function created(path: string) {
  dialogCreate.value = false
  router.push(path)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

// 在组件卸载时移除键盘事件监听器
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <form onsubmit="return false">
    <Input v-model="blog.title" label="标题" placeholder="请输入标题" />
    <Input v-model="blog.author" label="作者" placeholder="请输入作者" width="30%" readonly />
    <label>封面</label>
    <div class="select-container">
      <Input
        v-model="blog.cover"
        placeholder="请输入图片链接 或 上传本地图片"
        :readonly="uploader?.loading" />
      <Button
        @click="triggerUpload"
        label="上传图片"
        icon="upload"
        :disabled="uploader?.loading"
        :style="{ width: 'fit-content', height: 'fit-content' }" />
      <Upload ref="uploader" v-model="blog.cover" />
    </div>
    <label>标签</label>
    <div class="select-container">
      <Select
        :options="options"
        class="select"
        width="100%"
        placeholder="请选择标签"
        option-width="320px"
        multiple
        v-model="blog.tags" />
      <Button
        @click="dialog = true"
        label="新建标签"
        icon="add"
        :style="{ width: 'fit-content' }" />
    </div>
    <Textarea v-model="blog.desc" label="描述" placeholder="请输入描述" :rows="4" />
    <label>是否发布</label>
    <Switch class="switch" v-model="blog.enable" />
    <label>内容</label>
    <Editor
      class="editor"
      :locale="zhHans"
      :value="blog.content"
      :plugins="plugins"
      placeholder="请输入内容..."
      @change="handleChange" />
    <div class="btn-container">
      <Button @click="dialogReset = true" icon="reset" label="重写" />
      <Button @click="save" icon="save" label="临时保存" />
      <Button @click="upload" icon="upload" label="创建" />
    </div>
  </form>
  <CreateTag v-model="dialog" @callback="getTags" />
  <Confirm v-model="dialogReset" title="确认操作" @callback="reset">
    <p>
      <span>你确定要</span>
      <i :style="{ fontWeight: 'bold', margin: '0 5px' }">重置所有内容</i>
      <span>吗？</span>
    </p>
  </Confirm>
  <Confirm v-model="dialogCreate" title="创建成功">
    <template #default>
      <p>博客创建成功</p>
    </template>
    <template #btn>
      <Button @click="created('/blog/' + createdBlog._id)" icon="eye">查看详情</Button>
      <Button @click="created('/admin/blogs')" icon="exit">返回博客管理</Button>
    </template>
  </Confirm>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-flow: column nowrap;

  label {
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .select-container {
    display: grid;
    grid-template-columns: 70% 1fr;
    gap: 10px;

    .select {
      flex: 1;
    }
  }

  .switch {
    margin-left: 0;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    margin-bottom: 20px;
    gap: 10px;
  }

  .editor {
    ::v-deep(.bytemd) {
      background-color: var(--bg);
      color: var(--text);
      border: var(--normal-border);
      height: 500px;
      border-radius: 10px;

      input[type='checkbox']:checked {
        background-color: var(--bg);
      }
    }
    ::v-deep(.bytemd-toolbar) {
      background-color: var(--bg);
      color: var(--text);
      border-bottom: var(--normal-border);
    }
    ::v-deep(.CodeMirror) {
      background-color: var(--bg);
      color: var(--text);
    }
    ::v-deep(.bytemd-status) {
      border-top: var(--normal-border);
    }
    ::v-deep(.bytemd-preview) {
      border-left: var(--normal-border);
    }
    ::v-deep(.bytemd-toolbar-icon:hover) {
      background-color: var(--border);
    }
    ::v-deep(.bytemd-tippy-right[bytemd-tippy-path='5']) {
      display: none;
    }
    ::v-deep(.bytemd-sidebar) {
      border-left: var(--normal-border);
    }
    ::v-deep(.CodeMirror-cursor) {
      border-color: var(--text);
    }
    ::v-deep(.cm-s-default .cm-header) {
      color: #336699;
    }
    ::v-deep(.bytemd-toolbar) {
      border-radius: 10px 10px 0 0;
    }
    ::v-deep(.CodeMirror-vscrollbar),
    ::v-deep(.bytemd-preview) {
      scrollbar-width: thin;
      scrollbar-color: var(--hover) var(--border);
    }
    ::v-deep(.bytemd-preview) {
      background-color: var(--content);
    }
  }
}
</style>
