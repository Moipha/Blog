import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const theme = ref(null)
  function changeTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  // 监听主题变动
  watch(theme, (val) => {
    document.documentElement.dataset.theme = val
    localStorage.setItem('theme', val)
  })
  theme.value = localStorage.getItem('theme') || 'dark'
  return { theme, changeTheme }
})
