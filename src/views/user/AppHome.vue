<template>
    <section class="main">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <main class="tests">
            <h2>Список тестов</h2>
            <div 
                class="cards"
            >
                <AppTestCard 
                    v-for="(item, index) in tests"
                    :key="index"
                    :test="item"
                    @open="handleOpenCard(item)"
                />
            </div>
        </main>
    </section>
</template>    

<script>
    import { useUserStore } from '@/stores/user'
    import { getStudentTests } from '@/services/tests';

    import AppTestCard from '@/components/cards/AppTestCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';

    export default {
        components: { AppTestCard, AppHeader },
        data() {
            return {
                userData: null,
                token: 'mfkmrgk',
                toogle_items: [
                    { label: 'Тесты', route: '/home' },
                    { label: 'Результаты', route: '/results' },
                    { label: 'Выход', route: '/' }
                ],
                activeIndex: 0,
                tests: null
            }
        },
        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const tests_response = await getStudentTests(this.token)
            if (tests_response) {
                this.tests = tests_response
            }
        },
        methods: {
            handleOpenCard(card) {
                if (card.status == 'Доступен') {
                    this.$router.push(`/test/${card.id}`)
                }
                if (card.status == 'Не доступен') {
                    this.$router.push(`/results/${card.id}/${card.name}`)
                }
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