import { createRouter, createWebHashHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'

// AUTH
import AppLogin from '@/views/auth/AppLogin.vue'

// STUDENT
import AppHome from '@/views/user/AppHome.vue'
import AppTest from '@/views/user/AppTest.vue'
import AppResults from '@/views/user/AppResults.vue'
import AppTestResult from '@/views/user/AppTestResult.vue'

// LECTURER
import AppLectorTests from '@/views/lector/AppLectorTests.vue'
import AppLectorGroupsTests from '@/views/lector/AppLectorGroupsTests.vue'
import AppLectorTestResult from '@/views/lector/AppLectorTestResult.vue'
import AppLectorCreateTest from '@/views/lector/AppLectorCreateTest.vue'
import AppLectorTools from '@/views/lector/AppLectorTools.vue'
import AppAdminAddLector from '@/views/admin/AppAdminAddLector.vue'

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        // AUTH
        {
            path: '/',
            name: 'signin',
            component: AppLogin,
            meta: {
                public: true
            }
        },

        // LECTURER
        {
            path: '/lector',
            name: 'lector',
            component: AppLectorTests,
            meta: {
                roles: ['lector', 'admin'],
                breadcrumb: 'Тесты'
            }
        },

        {
            path: '/lector/:test_id',
            name: 'group_tests',
            component: AppLectorGroupsTests,

            meta: {
                roles: ['lector', 'admin'],
                breadcrumb: (route) => route.params.test_id
            },

            beforeEnter: (to, from, next) => {
                if (!to.params.test_id) {
                    next('/lector')
                    return
                }

                next()
            }
        },

        {
            path: '/lector/:test_id/:group_name',
            name: 'group_results',
            component: AppLectorTestResult,

            meta: {
                roles: ['lector', 'admin'],
                breadcrumb: 'Результаты'
            },

            beforeEnter: (to, from, next) => {
                if (!to.params.test_id) {
                    next('/lector')
                    return
                }

                next()
            }
        },

        {
            path: '/lector/tools',
            name: 'lector_tools',
            component: AppLectorTools,

            meta: {
                roles: ['lector', 'admin'],
                breadcrumb: 'Инструменты'
            }
        },

        {
            path: '/lector/tools/create',
            name: 'lector_tools_create',
            component: AppLectorCreateTest,

            meta: {
                roles: ['lector', 'admin'],
                breadcrumb: 'Создать тест'
            }
        },

        {
            path: '/lector/tools/add_lector',
            name: 'lector_tools_add_lector',
            component: AppAdminAddLector,

            meta: {
                roles: ['admin'],
                breadcrumb: 'Добавить лектора'
            }
        },

        // STUDENT
        {
            path: '/home',
            name: 'home',
            component: AppHome,

            meta: {
                roles: ['student']
            }
        },

        {
            path: '/results',
            name: 'results',
            component: AppResults,

            meta: {
                roles: ['student']
            }
        },

        {
            path: '/test/:id',
            name: 'test',
            component: AppTest,

            meta: {
                roles: ['student']
            },

            beforeEnter: (to, from, next) => {
                if (!to.params.id) {
                    next('/home')
                    return
                }

                next()
            }
        },

        {
            path: '/results/:id/:name',
            name: 'result_test',
            component: AppTestResult,

            meta: {
                roles: ['student']
            },

            beforeEnter: (to, from, next) => {
                if (!to.params.id || !to.params.name) {
                    next('/results')
                    return
                }

                next()
            }
        }
    ]
})

router.beforeEach(async (to) => {
    const token = localStorage.getItem('access_token');
    const userStore = useUserStore();

    // 1. нет токена
    if (!token) {
        if (to.meta.public) return true;
        return { name: 'signin' };
    }

    // 2. загружаем пользователя
    if (!userStore.user) {
        await userStore.fetchUser();
    }

    const user = userStore.user;

    // 3. если пользователь не загрузился / токен битый
    if (!user) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return { name: 'signin' };
    }

    // 4. роль
    const role =
        user.login === 'lector'
            ? 'admin'
            : user.is_lecturer
                ? 'lector'
                : 'student';

    // 5. редирект с login
    if (to.name === 'signin') {
        if (role === 'admin') return { name: 'lector_tools_add_lector' };
        if (role === 'lector') return { name: 'lector' };
        return { name: 'home' };
    }

    // 6. защита роутов
    if (to.meta.roles && !to.meta.roles.includes(role)) {
        if (role === 'admin') return { name: 'lector_tools_add_lector' };
        if (role === 'lector') return { name: 'lector' };
        return { name: 'home' };
    }

    return true;
});

export default router