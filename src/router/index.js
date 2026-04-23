import { createRouter, createWebHashHistory } from 'vue-router'
import AppLogin from '@/views/auth/AppLogin.vue'
import AppHome from '@/views/user/AppHome.vue'
import AppTest from '@/views/user/AppTest.vue'
import AppResults from '@/views/user/AppResults.vue'
import AppTestResult from '@/views/user/AppTestResult.vue'
import AppLectorTests from '@/views/lector/AppLectorTests.vue'
import AppLectorGroupsTests from '@/views/lector/AppLectorGroupsTests.vue'
import AppLectorTestResult from '@/views/lector/AppLectorTestResult.vue'
import AppLectorCreateTest from '@/views/lector/AppLectorCreateTest.vue'
import AppLectorTools from '@/views/lector/AppLectorTools.vue'

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
            meta: { 
                roles: ['lector'],
                breadcrumb: 'Группы'
            }
        },
        {
            path: '/lector/:group_name',
            name: 'group_tests',
            component: AppLectorGroupsTests,
            meta: { 
                roles: ['lector'],
                breadcrumb: (route) => route.params.group_name 
            },
            beforeEnter: (to, from, next) => {
                if (!to.params.group_name) {
                    next('/lector')
                } else {
                    next()
                }   
            }
        },
        {
            path: '/lector/:group_name/:test_name',
            name: 'group_results',
            component: AppLectorTestResult,
            meta: { 
                roles: ['lector'],
                breadcrumb: 'Результаты' 
            },
            beforeEnter: (to, from, next) => {
                if (!to.params.test_name) {
                    next('/lector/:group_name')
                } else {
                    next()
                }   
            }
        },
        {
            path: '/lector/tools',
            name: 'lector_tools',
            component: AppLectorTools,
            meta: { 
                roles: ['lector'],
                breadcrumb: 'Инструменты'
            }
        },
        {
            path: '/lector/tools/create',
            name: 'lector_tools_create',
            component: AppLectorCreateTest,
            meta: { 
                roles: ['lector'],
                breadcrumb: 'Создать тест'
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
            path: '/test/:id',
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
            path: '/results/:id/:name',
            name: 'result_test',
            component: AppTestResult,
            meta: { roles: ['student'] },
            beforeEnter: (to, from, next) => {
                if (!to.params.name || !to.params.id) {
                    next('/results')
                } else {
                    next()
                }   
            }
        }
    ],
})
router.beforeEach((to) => {
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ItCh0YLRg9C00LXQvdGCIiwicm9sZSI6InN0dWRlbnQiLCJleHAiOjQ3MzM5ODQwMDB9.eT4g8V1n8zYw3Qy7yq6X9l0GxF4k5YhX9cQ3Yx2wQ1M')
    const token = localStorage.getItem('token')

    const user = token ? getUserFromToken() : null

    // 1. нет токена
    if (!token) {
        if (to.meta.public) return true
        return { name: 'signin' }
    }

    // 2. если уже залогинен и идёт на login
    if (to.name === 'signin' && user?.role) {
        if (user.role === 'lector') {
            return { name: 'lector' }
        }

        if (user.role === 'student') {
            return { name: 'home' }
        }
    }

    // 3. проверка ролей
    if (to.meta.roles && !to.meta.roles.includes(user?.role)) {
        if (user?.role === 'lector') {
            return { name: 'lector' }
        }

        if (user?.role === 'student') {
            return { name: 'home' }
        }

        return { name: 'signin' }
    }

    return true
})

export default router
