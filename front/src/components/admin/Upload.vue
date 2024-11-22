<script lang="ts" setup>
import Image from '../Image.vue'

import axios from 'axios'
import { ref } from 'vue'
const { VITE_FILE_IP, VITE_FILE_PORT, VITE_FILE_PROTOCOL } = import.meta.env

const cover = defineModel<string>()

// 上传封面
async function uploadFile(event: any) {
  const file = event.target.files[0] // 获取用户选择的文件
  if (!file) {
    return
  }

  try {
    // 构造 FormData 对象
    const formData = new FormData()
    formData.append('media', file)
    // 调用上传接口
    const response = await axios.post(
      `${VITE_FILE_PROTOCOL}://${VITE_FILE_IP}:${VITE_FILE_PORT}/pic/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    cover.value = response.data.msg
    console.log('上传成功:', response.data)
  } catch (error) {
    console.error('上传失败:', error)
  }
}

// 定义ref
const fileInput = ref<HTMLInputElement | null>(null)

// 触发上传窗口
function triggerUpload() {
  fileInput.value?.click() // 触发隐藏 input 的点击事件
}

defineExpose({ upload: triggerUpload })
</script>

<template>
  <div>
    <input
      ref="fileInput"
      @change="uploadFile"
      accept="image/*"
      id="upload"
      class="upload"
      type="file" />
    <label class="upload-wrapper" for="upload">
      <Icon v-if="!cover" name="add" />
      <Image v-else :src="cover" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  display: none;
}
.upload-wrapper {
  height: 160px;
  width: fit-content;
  aspect-ratio: 16/10;
  border: 2px dashed var(--border);
  border-radius: 10px;
  cursor: pointer;
  background-color: var(--bg);
  font-size: 40px;
  color: var(--light-text);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
