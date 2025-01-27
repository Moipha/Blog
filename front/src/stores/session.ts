import { Blog } from '@/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 存储当前窗口的临时数据
 */

export const useSessionStore = defineStore(
  'session',
  () => {
    // 当前要访问的博客信息
    const curBlog = ref<Blog>(null as Blog)

    // 设置当前将访问的博客
    function setCurBlog(blog: Blog) {
      curBlog.value = blog
    }

    return { curBlog, setCurBlog }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'temp',
          storage: sessionStorage
        }
      ]
    }
  }
)
