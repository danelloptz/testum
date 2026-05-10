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

            <!-- ADD GROUP -->
            <div class="add_group">
                <input
                    v-model="groupName"
                    type="text"
                    placeholder="Введите номер группы"
                    @keyup.enter="handleAddGroup"
                />

                <button
                    class="add_btn"
                    @click="handleAddGroup"
                    :disabled="loading || !groupName.trim()"
                >
                    Добавить
                </button>
            </div>

            <!-- GROUPS -->
            <div class="cards">
                <AppLectorGroupCard
                    v-for="(item, index) in groups"
                    :key="index"
                    :name="item.group_name"
                    :count="item.members_count"
                    @open="$router.push(
                        `/lector/${testId}/${item.group_name}`
                    )"
                />
            </div>
        </main>
    </section>
</template>

<script>
import { useUserStore } from '@/stores/user';

import {
    grantTestAccess
} from '@/services/tests';

import {
    getTestGroups,
} from '@/services/groups';

import AppLectorGroupCard from '@/components/cards/AppLectorGroupCard.vue';
import AppHeader from '@/components/headers/AppHeader.vue';
import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

export default {
    components: {
        AppLectorGroupCard,
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

            groups: [],

            groupName: '',
            loading: false
        };
    },

    computed: {
        testId() {
            return this.$route.params.test_id;
        }
    },

    async created() {
        const userStore = useUserStore();

        await userStore.fetchUser();

        this.userData = userStore.user;

        await this.loadGroups();
    },

    methods: {
        async loadGroups() {
            const token = localStorage.getItem(
                'access_token'
            );

            const resp = await getTestGroups(
                token,
                this.testId,
                0
            );

            if (resp && resp.groups) {
                this.groups = resp.groups;
            }
        },

        async handleAddGroup() {
            if (!this.groupName.trim()) return;

            try {
                this.loading = true;

                const token = localStorage.getItem(
                    'access_token'
                );

                const resp = await grantTestAccess(
                    token,
                    this.testId,
                    this.groupName.trim()
                );

                if (resp?.success) {
                    this.groupName = '';

                    await this.loadGroups();
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
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
    padding-right: 150px;
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    box-sizing: border-box;
}

h2 {
    font-size: 36px;
    font-weight: 700;
    color: black;
}

.add_group {
    width: 100%;
    background: white;
    border-radius: 20px;
    padding: 24px;
    display: flex;
    gap: 16px;
    box-sizing: border-box;
    box-shadow: 0px 4px 25px 0px #0000000d;
}

.add_group input {
    flex: 1;
    border: none;
    outline: none;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 16px;
    font-size: 18px;
}

.add_btn {
    border: none;
    background: #2563eb;
    color: white;
    border-radius: 12px;
    padding: 0 24px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
}

.add_btn:hover {
    background: #1d4ed8;
}

.add_btn:disabled {
    opacity: 0.5;
    cursor: default;
}

.cards {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}
</style>