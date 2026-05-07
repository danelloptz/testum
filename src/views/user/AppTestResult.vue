<template>
    <section class="results">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <main class="tests">
            <h2>Результат теста: {{ testName }}</h2>

            <AppResultCard
                v-if="result"
                :result="result"
                @close="$router.push('/results')"
            />
        </main>
    </section>
</template>

<script>
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppResultCard from '@/components/cards/AppResultCard.vue';

    import { useUserStore } from '@/stores/user';
    import { getStudentTestResult } from '@/services/tests';

    export default {
        components: { AppHeader, AppResultCard },

        data() {
            return {
                toogle_items: [
                    { label: 'Тесты', route: '/home' },
                    { label: 'Результаты', route: '/results' },
                    { label: 'Выход', route: '/' }
                ],
                activeIndex: 1,
                result: null
            };
        },

        computed: {
            testId() {
                return this.$route.params.id;
            },

            testName() {
                return this.$route.params.name;
            },

            userData() {
                return useUserStore().user;
            }
        },

        async created() {
            const token = localStorage.getItem('access_token');

            const res = await getStudentTestResult(token, this.testId);

            this.result = res;
        }
    };
</script>

<style scoped>
    .results {
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