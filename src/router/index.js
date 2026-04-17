import { createRouter, createWebHistory } from 'vue-router'
import AppLogin from '@/views/auth/AppLogin.vue'
import AppHome from '@/views/user/AppHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: AppLogin,
    },
    {
      path: '/home',
      name: 'home',
      component: AppHome,
    },
  ],
})

export default router
