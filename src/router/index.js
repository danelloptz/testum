import { createRouter, createWebHistory } from 'vue-router'
import AppLogin from '@/views/auth/AppLogin.vue'
import AppHome from '@/views/user/AppHome.vue'
import AppTest from '@/views/user/AppTest.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'signin',
            component: AppLogin,
            meta: { public: true }
        },
        {
            path: '/home',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/test/:id?',
            name: 'test',
            component: AppTest,
            beforeEnter: (to, from, next) => {
                if (!to.params.id) {
                    next('/home')
                } else {
                    next()
                }   
            }
        }
    ],
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.name === 'signin' && token) {
        return next('/home')
    }

    if (to.meta.public) {
        return next()
    }

    if (!token) {
        return next('/')
    }

    next()
})

export default router
