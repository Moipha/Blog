<script lang="ts" setup>
import Input from '@/components/admin/Input.vue'
import Button from '@/components/admin/Button.vue'
import Select from '@/components/admin/Select.vue'
import CreateTag from '@/layouts/admin/CreateTag.vue'
import Switch from '@/components/admin/Switch.vue'
import Confirm from '@/layouts/admin/Confirm.vue'
import Textarea from '@/components/admin/Textarea.vue'
import Upload from '@/components/admin/Upload.vue'
import { Editor } from '@bytemd/vue-next'

import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm'
// @ts-ignore
import zhHans from 'bytemd/locales/zh_Hans'
import { onActivated, onMounted, ref } from 'vue'
import api from '@/api'
import { BlogDTO, Res, Tag } from '@/type'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String
})
// 根据路径中的id获取博客信息
function getBlog() {
  api.blog.getById(props.id, (res: Res) => {
    blog.value = {
      _id: res.data._id || '',
      title: res.data.title || '',
      content: res.data.content || '',
      tags: [...res.data.tags.map((item: { _id: any }) => item._id)],
      enable: res.data.enable || true,
      author: res.data.author || 'Moipha',
      desc: res.data.desc || '',
      cover: res.data.cover || ''
    }
  })
}
// 新建博客
const blog = ref<BlogDTO>({
  title: '',
  content: '',
  tags: [],
  enable: true,
  author: 'Moipha',
  desc: ''
} as BlogDTO)

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
}

// 重置弹窗
const dialogReset = ref<boolean>(false)

// 修改博客
function edit() {
  console.dir(blog.value)
  api.blog.update(
    blog.value,
    (res: Res) => {
      alert('修改成功')
      router.push('/admin/blogs')
    },
    (err: Res) => {
      alert(err.msg)
    }
  )
}

// 定义ref
const uploader = ref(null)

// 触发上传窗口
function triggerUpload() {
  uploader.value.upload()
}

onMounted(() => {
  getTags()
})

onActivated(() => {
  getBlog()
})
</script>

<template>
  <form onsubmit="return false">
    <Input v-model="blog.title" label="标题" placeholder="请输入标题" />
    <Input readonly v-model="blog.author" label="作者" placeholder="请输入作者" />
    <label>封面</label>
    <div class="select-container">
      <Input v-model="blog.cover" placeholder="请输入图片链接 或 上传本地图片" />
      <Button
        @click="triggerUpload"
        label="上传图片"
        icon="upload"
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
      <Button @click="router.push('/admin/blogs')" icon="exit" label="取消" />
      <Button @click="dialogReset = true" icon="reset" label="重写" />
      <Button @click="edit" icon="edit" label="修改" />
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
    grid-template-columns: 60% 1fr;
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
