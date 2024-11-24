import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore(
  'setting',
  () => {
    /**
     * 主题
     */
    const theme = ref('dark')
    function startThemeTransition() {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
    // 监听主题变动
    watch(theme, (val) => {
      const root = document.documentElement
      root.dataset.theme = val
    })

    // 切换主题
    function changeTheme(event: MouseEvent) {
      const x = event.clientX
      const y = event.clientY
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      // 设置 CSS 变量
      const root = document.documentElement
      root.style.setProperty('--x', `${x}px`)
      root.style.setProperty('--y', `${y}px`)
      root.style.setProperty('--r', `${radius}px`)

      // 使用 View Transition
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          startThemeTransition() // 切换主题
        })
      } else {
        startThemeTransition() // 如果不支持 View Transition，直接切换
      }
    }

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
