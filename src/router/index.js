
import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

export default route(function () {
  const Router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
    routes,
  });

  // Add a global navigation guard
  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token'); // Check for token in localStorage

    if (to.path !== '/login' && !token) {
      next('/login');
      console.log('iff')
    } else if (to.path === '/login' && token) {
      next('/');
      console.log('else')
    } else {
      next();
    }
  });

  return Router;
});

