const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/permission', component: () => import('pages/permission/index.vue') },
      { path: '/permission/add', component: () => import('pages/permission/add.vue') }
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
