import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore(
  'setting',
  () => {
    /**
     * 主题
     */
    const theme = ref('dark')
    function changeTheme() {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
    // 监听主题变动
    watch(theme, (val) => {
      document.documentElement.dataset.theme = val
    })

    return { theme, changeTheme }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'setting',
          storage: localStorage
        }
      ]
    }
  }
)
