const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'),  name: 'home'  },
      { path: '/permission', component: () => import('pages/permission/index.vue'),  name: 'Permission' },
      { path: '/permission/add', component: () => import('pages/permission/add.vue'), name: 'PermissionAdd' },
      { path: '/permission/:id', component: () => import('pages/permission/edit.vue'), name: 'PermissionEdit' },

      { path: '/category', component: () => import('pages/category/index.vue'), name: 'Category' },
      { path: '/category/add', component: () => import('pages/category/add.vue'),  name: 'CategoryAdd' },
      { path: '/category/:id', component: () => import('pages/category/edit.vue'), name: 'CategoryEdit' },

      { path: '/course', component: () => import('pages/course/index.vue'), name: 'Course' },
      { path: '/course/add', component: () => import('pages/course/add.vue'),  name: 'CourseAdd' },
      { path: '/course/:id', component: () => import('pages/course/edit.vue'), name: 'CourseEdit' },

      { path: '/student', component: () => import('pages/student/index.vue'), name: 'Student' },
      { path: '/student/add', component: () => import('pages/student/add.vue'),  name: 'StudentAdd' },
      { path: '/student/:id', component: () => import('pages/student/edit.vue'), name: 'StudentEdit' },
    ]
  },

  {
    path: '/login',
    component: () => import('src/pages/Auth/LoginWeb.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
