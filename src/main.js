import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/global.scss'

import Icon from '@/components/Icon.vue'
import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App)

// 使用pinia持久化插件
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.use(router)

// 注册全局组件
app.component('Icon', Icon)

app.mount('#app')
