import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')

    return { token }
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
