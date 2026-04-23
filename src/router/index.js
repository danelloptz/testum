import { createRouter, createWebHashHistory } from 'vue-router'
import AppLogin from '@/views/auth/AppLogin.vue'
import AppHome from '@/views/user/AppHome.vue'
import AppTest from '@/views/user/AppTest.vue'
import AppResults from '@/views/user/AppResults.vue'
import AppTestResult from '@/views/user/AppTestResult.vue'
import AppLectorTests from '@/views/lector/AppLectorTests.vue'
import AppLectorGroupsTests from '@/views/lector/AppLectorGroupsTests.vue'

import { getUserFromToken } from '@/utils/auth'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'signin',
            component: AppLogin,
            meta: { public: true }
        },
        {
            path: '/lector',
            name: 'lector',
            component: AppLectorTests,
            meta: { roles: ['lector'] }
        },
        {
            path: '/lector/:name',
            name: 'group_tests',
            component: AppLectorGroupsTests,
            meta: { roles: ['lector'] },
            beforeEnter: (to, from, next) => {
                if (!to.params.name) {
                    next('/lector')
                } else {
                    next()
                }   
            }
        },
        {
            path: '/home',
            name: 'home',
            component: AppHome,
            meta: { roles: ['student'] }
        },
        {
            path: '/results',
            name: 'results',
            component: AppResults,
            meta: { roles: ['student'] }
        },
        {
            path: '/test/:id?',
            name: 'test',
            component: AppTest,
            meta: { roles: ['student'] },
            beforeEnter: (to, from, next) => {
                if (!to.params.id) {
                    next('/home')
                } else {
                    next()
                }   
            }
        },
        {
            path: '/results/:id?',
            name: 'result_test',
            component: AppTestResult,
            meta: { roles: ['student'] },
            beforeEnter: (to, from, next) => {
                if (!to.params.id) {
                    next('/results')
                } else {
                    next()
                }   
            }
        }
    ],
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const user = getUserFromToken()

    if (!token) {
        if (to.meta.public) return next()
        return next('/')
    }

    if (to.name === 'signin') {
        return next('/home')
    }

    // 🔥 если у роута есть роли
    if (to.meta.roles) {
        if (!to.meta.roles.includes(user?.role)) {

            // 👇 редирект в "свою зону"
            if (user?.role === 'lector') {
                return next('/lector')
            }

            if (user?.role === 'student') {
                return next('/home')
            }

            return next('/')
        }
    }

    next()
})

export default router
