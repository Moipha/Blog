import { createRouter, createWebHistory } from 'vue-router'
import bus from '@/utils/bus'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/components/Layout/MainLayout.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/pages/Home/Home.vue')
        },
        {
          path: '/blog',
          children: [
            {
              path: ':id',
              component: () => import('@/pages/Blog/Blog.vue'),
              props: true
            },
            {
              path: '',
              component: () => import('@/pages/Blog/Blogs.vue')
            }
          ]
        },
        {
          path: '/tags',
          component: () => import('@/pages/Tag/TagBase.vue'),
          children: [
            {
              path: ':id',
              component: () => import('@/pages/Tag/Tag.vue'),
              props: true
            },
            {
              path: '',
              component: () => import('@/pages/Tag/Tags.vue')
            }
          ]
        },
        {
          path: '/about',
          component: () => import('@/pages/About/About.vue')
        },
        {
          path: '/search',
          component: () => import('@/pages/Search/SearchResult.vue')
        }
      ]
    },
    {
      path: '/admin',
      meta: {
        title: '首页'
      },
      redirect: '/admin/home',
      component: () => import('@/components/Layout/Admin/AdminLayout.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/pages/Admin/Home/Home.vue')
        },
        {
          path: 'blogs',
          meta: {
            title: '博客'
          },
          children: [
            {
              path: '',
              component: () => import('@/pages/Admin/Blog/Blogs.vue')
            },
            {
              path: 'create',
              meta: {
                title: '新建博客'
              },
              component: () => import('@/pages/Admin/Blog/CreateBlog.vue')
            },
            {
              path: 'edit/:id',
              name: 'editBlog',
              meta: {
                title: '编辑博客'
              },
              component: () => import('@/pages/Admin/Blog/EditBlog.vue'),
              props: true
            }
          ]
        },
        {
          path: 'tags',
          meta: {
            title: '标签'
          },
          component: () => import('@/pages/Admin/Tag/Tags.vue')
        },
        {
          path: 'graphs',
          meta: {
            title: '统计'
          },
          component: () => import('@/pages/Admin/Graph/Graphs.vue')
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
