import { createRouter, createWebHistory } from 'vue-router'
import bus from '@/utils/bus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/blog',
          children: [
            {
              path: ':id',
              name: 'blog',
              component: () => import('@/views/Blog.vue'),
              props: true
            },
            {
              path: '',
              name: 'blogs',
              component: () => import('@/views/Blogs.vue')
            }
          ]
        },
        {
          path: '/code',
          name: 'code',
          component: () => import('@/views/Code.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/About.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/home',
      component: () => import('@/layouts/admin/AdminLayout.vue'),
      children: [
        {
          path: 'home',
          name: '首页',
          component: () => import('@/views/admin/Home.vue')
        },
        {
          path: 'blogs',
          name: '博客',
          component: () => import('@/views/admin/Blogs.vue')
        },
        {
          path: 'codes',
          name: '代码',
          component: () => import('@/views/admin/Codes.vue')
        },
        {
          path: 'tags',
          name: '标签',
          component: () => import('@/views/admin/Tags.vue')
        },
        {
          path: 'graphs',
          name: '统计',
          component: () => import('@/views/admin/Graphs.vue')
        }
      ]
    }
  ],
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
  if (to.path === from.path) return
  if (to.path.startsWith('/admin')) {
    // 修改active nav
    bus.emit('change-admin-nav', to.path)
  } else {
    bus.emit('change-nav', to.path)
  }
})

export default router
