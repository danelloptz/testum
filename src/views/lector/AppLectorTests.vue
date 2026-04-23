<template>
    <section class="main">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <main class="tests">
            <h2>Ваши группы</h2>
            <div 
                class="cards"
            >
                <AppLectorGroupCard 
                    v-for="(item, index) in groups"
                    :key="index"
                    :name="item.name"
                    @open="$router.push(`/lector/${item.name}`)"
                />
            </div>
        </main>
    </section>
</template>    

<script>
    import { useUserStore } from '@/stores/user'
    import { getGroups } from '@/services/groups';

    import AppLectorGroupCard from '@/components/cards/AppLectorGroupCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';

    export default {
        components: { AppLectorGroupCard, AppHeader },
        data() {
            return {
                userData: null,
                token: 'mfkmrgk',
                toogle_items: ['Тесты', 'Результаты', 'Выход'],
                activeIndex: 0,
                groups: null
            }
        },
        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const group_response = await getGroups(this.token)
            if (group_response) {
                this.groups = group_response
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