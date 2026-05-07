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
            <h2>Ваши группы</h2>

            <div class="cards">
                <AppLectorGroupCard
                    v-for="(item, index) in groups"
                    :key="index"
                    :name="item.group_name"
                    :count="item.members_count"
                    @open="$router.push(`/lector/${item.group_name}`)"
                />
            </div>
        </main>
    </section>
</template>

<script>
    import { useUserStore } from '@/stores/user'
    import { getTestGroups } from '@/services/groups'

    import AppLectorGroupCard from '@/components/cards/AppLectorGroupCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

    export default {
        components: { AppLectorGroupCard, AppHeader, AppBreadcrumbs },

        data() {
            return {
                userData: null,

                toogle_items: [
                    { label: 'Группы', route: '/lector' },
                    { label: 'Инструменты', route: '/lector/tools' },
                    { label: 'Выход', route: '/' }
                ],

                activeIndex: 0,
                groups: []
            }
        },

        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user

            const token = localStorage.getItem('access_token')

            // ⚠️ если нет test_id на этом экране — нужно передавать или выбрать дефолт
            const testId = this.$route.params.test_id || 0
            const year = new Date().getFullYear()

            const resp = await getTestGroups(token, testId, year)

            if (resp && resp.groups) {
                this.groups = resp.groups
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