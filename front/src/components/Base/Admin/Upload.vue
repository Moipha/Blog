<script lang="ts" setup>
import Image from '../Image.vue'

import axios from 'axios'
import { ref } from 'vue'
const { VITE_FILE_IP, VITE_FILE_PORT, VITE_FILE_PROTOCOL } = import.meta.env

// 图片路径
const cover = defineModel<string>()

// 上传进度
const uploadProgress = ref(0) // 初始化进度为0

const loading = ref<boolean>(false)

// 上传封面
async function uploadFile(event: any) {
  const file = event.target.files[0] // 获取用户选择的文件
  if (!file) {
    return
  }
  // 检查文件大小
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 10MB
  if (file.size > MAX_FILE_SIZE) {
    alert('上传失败：文件大小不能超过 5MB')
    return
  }

  try {
    // 重置进度
    uploadProgress.value = 0
    loading.value = true
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
        },
        onUploadProgress: (progressEvent) => {
          // 更新上传进度
          if (progressEvent.total) {
            uploadProgress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          }
        }
      }
    )

    cover.value = response.data.msg
    console.log('上传成功:', response.data)
  } catch (error) {
    console.error('上传失败:', error)
    alert('上传失败: ' + error.message)
  } finally {
    // 上传结束后隐藏进度条
    uploadProgress.value = 0
    loading.value = false
  }
}

// 定义ref
const fileInput = ref<HTMLInputElement | null>(null)

// 触发上传窗口
function triggerUpload() {
  fileInput.value?.click() // 触发隐藏 input 的点击事件
}

defineExpose({ upload: triggerUpload, loading })
</script>

<template>
  <div>
    <input
      :disabled="loading"
      ref="fileInput"
      @change="uploadFile"
      accept="image/*"
      id="upload"
      class="upload"
      type="file" />
    <label class="upload-wrapper" for="upload">
      <Image v-if="cover" :src="cover" />
      <div
        v-else-if="!cover && loading"
        class="progress"
        :style="{ '--progress': uploadProgress + '%' }">
        {{ uploadProgress }}%
      </div>
      <Icon v-else name="add" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  display: none;
  &[disabled] + .upload-wrapper {
    cursor: wait;
  }
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
  position: relative;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, var(--text) var(--progress, 0%), var(--back) 0%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--active);
  font-size: 30px;
  font-weight: bold;
}
</style>
