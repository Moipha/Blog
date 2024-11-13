import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BlogDTO } from '@/type'

/**
 * 存放临时数据的store
 */

export const useTempStore = defineStore(
  'temp',
  () => {
    const newBlog = ref<BlogDTO>({ enable: true, tags: [], author: 'Moipha' } as BlogDTO)
    return { newBlog }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'temp',
          storage: localStorage
        }
      ]
    }
  }
)
