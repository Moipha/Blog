import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/global.scss'

import Icon from '@/components/Icon.vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册全局组件
app.component('Icon', Icon)

app.mount('#app')
