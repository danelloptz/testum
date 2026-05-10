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

            <h2>Список тестов</h2>

            <div class="cards">
                <AppLectorGroupTestCard
                    v-for="(item, index) in tests"
                    :key="index"
                    :test="item"
                    @open="openResults(item)"
                />
            </div>
        </main>
    </section>
</template>

<script>
    import { useUserStore } from '@/stores/user'
    import { getLecturerTests } from '@/services/tests'

    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppLectorGroupTestCard from '@/components/cards/AppLectorGroupTestCard.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

    export default {
        components: {
            AppLectorGroupTestCard,
            AppHeader,
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
                tests: []
            }
        },

        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const token = localStorage.getItem('access_token')

            const resp = await getLecturerTests(token)

            if (resp && resp.tests) {
                // можно позже фильтровать по группе (если бек добавит group mapping)
                this.tests = resp.tests
            }
        },

        methods: {
            openResults(test) {
                this.$router.push(
                    `/lector/${test.id}`
                )
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
        margin-top: 64px;
        width: 100%;
        padding-left: 150px;
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