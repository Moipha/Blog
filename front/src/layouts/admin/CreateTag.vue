<script lang="ts" setup>
import Input from '@/components/admin/Input.vue'
import Select from '@/components/admin/Select.vue'
import Button from '@/components/admin/Button.vue'
import Textarea from '@/components/admin/Textarea.vue'
import Dialog from '@/layouts/admin/Dialog.vue'

import api from '@/api'
import { Res, Tag } from '@/type'
import { ref } from 'vue'
import iconToUrl from '@/utils/iconUtil'

const emits = defineEmits(['callback'])
const dialog = defineModel<boolean>()

// 新标签
const newTag = ref<Tag>({ type: 'blog' } as Tag)

// 新建标签
function createTag() {
  api.tag.create(
    newTag.value,
    (res: Res) => {
      alert('标签创建成功')
      emits('callback')
      dialog.value = false
      newTag.value = { type: 'blog' } as Tag
    },
    (err: Error) => {
      alert('标签创建失败' + err)
    }
  )
}
</script>

<template>
  <!-- 窗口：添加 -->
  <Dialog v-model="dialog" title="新增标签">
    <Input placeholder="请输入名称" label="名称" v-model="newTag.name" />
    <label class="dialog-label">类型</label>
    <Select
      v-model="newTag.type"
      width="100%"
      :options="[
        { label: '博客', value: 'blog' },
        { label: '片段', value: 'code' },
        { label: '通用', value: 'general' }
      ]" />
    <div class="icon-container">
      <Textarea
        placeholder="请输入 SVG字符串、data:url字符串 或 图片地址"
        label="图标"
        v-model="newTag.icon"
        :decorator="iconToUrl" />
      <div class="effects">
        <label class="dialog-label">预览</label>
        <div class="icon-wrapper">
          <Icon class="temp-icon" :url="iconToUrl(newTag.icon)"></Icon>
        </div>
      </div>
    </div>
    <Button class="dialog-btn" @click="createTag">
      <Icon class="icon" name="add"></Icon>
      <span>创建</span>
    </Button>
  </Dialog>
</template>

<style lang="scss" scoped>
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
  transition: 0.2s all ease;

  .icon {
    font-size: 18px;
  }
}
.delete-text {
  margin-top: 10px;
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
      border: 1.5px solid var(--border);
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
