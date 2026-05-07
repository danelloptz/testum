<template>
    <section class="results">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <main class="tests">
            <h2>Результаты пройденных тестов</h2>
            <div 
                class="cards"
            >
                <AppLectorTestCard 
                    v-for="(item, index) in tests"
                    :key="index"
                    :test="item"
                    @open="$router.push(`/results/${item.id}/${item.name}`)"
                />
            </div>
        </main>
    </section>
    
</template>

<script>
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppLectorTestCard from '@/components/cards/AppLectorTestCard.vue';
    
    import { useUserStore } from '@/stores/user'
    import { getFinishedStudentTests } from '@/services/tests';

    export default {
        components: { AppHeader, AppLectorTestCard },
        data() {
            return {
                toogle_items: [
                    { label: 'Тесты', route: '/home' },
                    { label: 'Результаты', route: '/results' },
                    { label: 'Выход', route: '/' }
                ],
                activeIndex: 1,
                tests: null
            }
        },
        computed: {
            userData() {
                return useUserStore().user
            }
        },
        async created() {
            const token = localStorage.getItem('access_token')

            const resp = await getFinishedStudentTests(token)
            this.tests = resp.finished_tests;
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