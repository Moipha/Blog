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
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/blog',
          children: [
            {
              path: ':id',
              component: () => import('@/views/Blog.vue'),
              props: true
            },
            {
              path: '',
              component: () => import('@/views/Blogs.vue')
            }
          ]
        },
        {
          path: '/code',
          component: () => import('@/views/Code.vue')
        },
        {
          path: '/about',
          component: () => import('@/views/About.vue')
        }
      ]
    },
    {
      path: '/admin',
      meta: {
        title: '首页'
      },
      redirect: '/admin/home',
      component: () => import('@/layouts/admin/AdminLayout.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/admin/Home.vue')
        },
        {
          path: 'blogs',
          meta: {
            title: '博客'
          },
          children: [
            {
              path: '',
              component: () => import('@/views/admin/Blogs.vue')
            },
            {
              path: 'create',
              meta: {
                title: '新建博客'
              },
              component: () => import('@/views/admin/CreateBlog.vue')
            },
            {
              path: 'edit/:id',
              name: 'editBlog',
              meta: {
                title: '编辑博客'
              },
              component: () => import('@/views/admin/EditBlog.vue'),
              props: true
            }
          ]
        },
        {
          path: 'codes',
          meta: {
            title: '代码'
          },
          component: () => import('@/views/admin/Codes.vue')
        },
        {
          path: 'tags',
          meta: {
            title: '标签'
          },
          component: () => import('@/views/admin/Tags.vue')
        },
        {
          path: 'graphs',
          meta: {
            title: '统计'
          },
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
