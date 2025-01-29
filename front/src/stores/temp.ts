import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BlogDTO } from '@/type'

// 24 小时的毫秒数常量
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000

/**
 * 存放临时数据的store
 */

export const useTempStore = defineStore(
  'temp',
  () => {
    // 新建博客的数据（临时存储）
    const newBlog = ref<BlogDTO>({ enable: true, tags: [], author: 'Moipha', cover: '' } as BlogDTO)

    /**
     * 浏览记录
     */

    // 访问过的博客记录（用于计算浏览次数）
    const viewedBlogs = ref<Record<string, number>>({})

    // 添加已访问博客记录
    function viewBlog(id: string) {
      viewedBlogs.value[id] = Date.now()
    }

    // 判断24小时内是否访问过某博客
    function isViewed(id: string): boolean {
      const visitTime = viewedBlogs.value[id]

      // 无记录则直接返回未访问过
      if (!visitTime) return false

      // 计算上次访问距现在的时间差
      const currentTime = Date.now()
      const isWithin24Hours = currentTime - visitTime < TWENTY_FOUR_HOURS_MS

      // 自动清理过期记录
      if (!isWithin24Hours) {
        delete viewedBlogs.value[id]
        return false
      }

      return true
    }

    /**
     * 点赞记录
     */

    // 存储用户点赞的博客记录
    const likedBlogs = ref<Record<string, number>>({})

    // 点赞博客
    function likeBlog(id: string) {
      likedBlogs.value[id] = Date.now() // 记录点赞时间
    }

    // 取消点赞博客
    function unlikeBlog(id: string) {
      delete likedBlogs.value[id] // 删除点赞记录
    }

    // 检查是否点赞过某博客
    function isLiked(id: string): boolean {
      return !!likedBlogs.value[id] // 如果存在记录，则返回 true
    }

    return { newBlog, viewedBlogs, viewBlog, isViewed, likedBlogs, likeBlog, unlikeBlog, isLiked }
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
