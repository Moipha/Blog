import { createRouter, createWebHistory } from 'vue-router'

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
          name: 'admin-home',
          component: () => import('@/views/admin/Home.vue')
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

export default router
