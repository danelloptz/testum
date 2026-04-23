<template>
    <section class="main">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <main class="tests">
            <h2>Список тестов группы {{ groupName }}</h2>
            <div 
                class="cards"
            >
                <AppLectorGroupTestCard 
                    v-for="(item, index) in tests"
                    :key="index"
                    :test="item"
                />
            </div>
        </main>
    </section>
</template>    

<script>
    import { useUserStore } from '@/stores/user'
    import { getGroupTests } from '@/services/tests';

    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppLectorGroupTestCard from '@/components/cards/AppLectorGroupTestCard.vue';
    

    export default {
        components: { AppLectorGroupTestCard, AppHeader },
        data() {
            return {
                userData: null,
                token: 'mfkmrgk',
                toogle_items: ['Тесты', 'Результаты', 'Выход'],
                activeIndex: 0,
                tests: null
            }
        },
        computed: {
            groupName() {
                return this.$route.params.name
            },
        },
        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const group_response = await getGroupTests(this.token)
            if (group_response) {
                this.tests = group_response
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