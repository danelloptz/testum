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
            <AppLectorTestResultTable :results="students" />

        </main>
    </section>
</template>    

<script>
    import { useUserStore } from '@/stores/user'
    import { getStudentResults } from '@/services/tests';

    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppLectorTestResultTable from '@/components/tables/AppLectorTestResultTable.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

    export default {
        components: { AppHeader, AppLectorTestResultTable, AppBreadcrumbs },
        data() {
            return {
                userData: null,
                token: 'mfkmrgk',
                toogle_items: [
                    { label: 'Группы', route: '/lector' },
                    { label: 'Инструменты', route: '/tools' },
                    { label: 'Выход', route: '/' }
                ],
                activeIndex: 0,
                students: null
            }
        },
        computed: {
            testName() {
                return this.$route.params.test_name
            },
        },
        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const group_response = await getStudentResults(this.token)
            if (group_response) {
                this.students = group_response;
                console.log(this.students);
            }
        },
        // methods: {
        //     handleOpenCard(card) {
        //         if (card.status == 'Доступен') {
        //             this.$router.push(`/test/${card.id}`)
        //         }
        //     }
        // }
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

    .cards {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
    }
</style>