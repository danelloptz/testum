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
            <h2>Инструменты</h2>
            <div 
                class="cards"
            >
                <AppToolCard 
                    v-for="(item, index) in tools"
                    :key="index"
                    :text="item.label"
                    :icon="item.icon"
                    :filled="item.filled"
                    @open="handleOpen(item)"
                />
            </div>
        </main>
    </section>
</template>    

<script>
    import { useUserStore } from '@/stores/user'

    import AppPencil from '@/assets/images/pencil.png';
    import AppUpload from '@/assets/images/addImage.png';
    import AppTool from '@/assets/images/tool.png';

    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';
    import AppToolCard from '@/components/cards/AppToolCard.vue';

    export default {
        components: { AppHeader, AppBreadcrumbs, AppToolCard },
        data() {
            return {
                userData: null,
                toogle_items: [
                    { label: 'Группы', route: '/lector' },
                    { label: 'Инструменты', route: '/lector/tools' },
                    { label: 'Выход', route: '/' }
                ],
                activeIndex: 1,
                tests: null,

                AppPencil,
                AppUpload,
                AppTool,

                tools: [
                    {
                        label: 'Создать тест',
                        filled: true,
                        icon: AppPencil
                    },
                    {
                        label: 'Добавить лектора',
                        filled: false,
                        icon: AppTool
                    }
                ]
            }
        },
        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user
        },
        methods: {
            handleOpen(tool) {
                if (tool.label == 'Создать тест') {
                    this.$router.push(`/lector/tools/create`)
                }
                if (tool.label == 'Добавить лектора') {
                    this.$router.push(`/lector/tools/add_lector`)
                }
            },
            openResults(test) {
                this.$router.push(`/lector/${this.groupName}/${test.name}`)
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
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
        flex-wrap: wrap;
        padding-right: 121px;
    }
</style>