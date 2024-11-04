<script lang="ts" setup>
import Input from '@/components/admin/Input.vue'
import Button from '@/components/admin/Button.vue'
import Select from '@/components/admin/Select.vue'
import CreateTag from '@/layouts/admin/CreateTag.vue'
import { ref } from 'vue'
import api from '@/api'
import { BlogDTO, Res, Tag } from '@/type'

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
    (err: Error) => {
      console.log(err)
    }
  )
}
getTags()

// 新建的博客
const blog = ref<BlogDTO>({} as BlogDTO)
</script>

<template>
  <form onsubmit="return false">
    <Input label="标题" placeholder="请输入标题" />
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
  </form>
  <CreateTag v-model="dialog" @callback="getTags" />
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
}
</style>
