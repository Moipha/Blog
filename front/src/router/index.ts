import { createRouter, createWebHistory } from 'vue-router'
import bus from '@/utils/bus'
import NProgress from 'nprogress'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 设置切换路由后的滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  // 防止原地踏步
  if (to.path === from.path) return
  // 显示进度条
  NProgress.start()
  if (to.path.startsWith('/admin')) {
    // 修改active nav
    bus.emit('change-admin-nav', to.path)
  } else {
    bus.emit('change-nav', to.path)
  }
})

router.afterEach(() => {
  // 隐藏进度条
  NProgress.done()
})

export default router
