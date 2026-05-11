<template>
    <section class="main">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <main class="tests">
            <AppBreadcrumbs />

            <h2>Результаты теста: {{ testName }}</h2>

            <AppLectorTestResultTable
                v-if="students"
                :results="students"
            />
        </main>
    </section>
</template>

<script>
    import { useUserStore } from '@/stores/user'
    import { getTestResults } from '@/services/tests'

    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppLectorTestResultTable from '@/components/tables/AppLectorTestResultTable.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

    export default {
        components: {
            AppHeader,
            AppLectorTestResultTable,
            AppBreadcrumbs
        },

        data() {
            return {
                userData: null,

                toogle_items: [
                    { label: 'Группы', route: '/lector' },
                    { label: 'Инструменты', route: '/lector/tools' },
                    { label: 'Выход', route: '/' }
                ],

                activeIndex: 0,
                students: []
            }
        },

        computed: {
            testId() {
                return this.$route.params.test_id
            },
            testName() {
                return this.$route.params.test_name
            },
        },

        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const token = localStorage.getItem('access_token')

            const group = this.$route.params.group_name
            const year = new Date().getFullYear()

            const resp = await getTestResults(token, this.testId, group, 0)

            if (resp && resp.results) {
                this.students = resp.results
            }
        }
    };
</script>

<style scoped>
    .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #f8fafc;
    }

    .tests {
        margin-top: 20px;
        width: 100%;
        padding: 0px 100px;
        display: flex;
        flex-direction: column;
        row-gap: 40px;
    }

    h2 {
        font-size: 36px;
        font-weight: 700;
        color: black;
    }
</style>