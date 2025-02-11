const routes = [
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
]

export default routes
