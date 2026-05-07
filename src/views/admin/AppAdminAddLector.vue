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

            <h2>Управление лекторами</h2>

            <section class="lecturers">
                <div class="add_box">
                    <input
                        v-model="login"
                        type="text"
                        placeholder="Введите логин пользователя"
                        @keyup.enter="addNewLecturer"
                    />

                    <button
                        class="add_btn"
                        @click="addNewLecturer"
                        :disabled="loading || !login.trim()"
                    >
                        Добавить
                    </button>
                </div>

                <div class="list">
                    <div
                        v-for="lecturer in lecturers"
                        :key="lecturer.id"
                        class="item"
                    >
                        <div class="info">
                            <span class="name">
                                {{ lecturer.name }}
                            </span>

                            <span class="login_text">
                                {{ lecturer.login }}
                            </span>

                            <span class="mail">
                                {{ lecturer.mail }}
                            </span>
                        </div>

                        <button
                            class="delete_btn"
                            @click="removeLecturer(lecturer.id)"
                        >
                            Удалить
                        </button>
                    </div>

                    <div
                        v-if="!lecturers.length"
                        class="empty"
                    >
                        Список лекторов пуст
                    </div>
                </div>
            </section>
        </main>
    </section>
</template>

<script>
import AppHeader from '@/components/headers/AppHeader.vue';
import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

import { useUserStore } from '@/stores/user';

import {
    getLecturers,
    createLecturer,
    deleteLecturer
} from '@/services/admin';

export default {
    name: 'LecturersPage',

    components: {
        AppHeader,
        AppBreadcrumbs
    },

    data() {
        return {
            lecturers: [],
            login: '',
            loading: false,

            userData: null,

            toogle_items: [
                { label: 'Группы', route: '/lector' },
                { label: 'Инструменты', route: '/lector/tools' },
                { label: 'Выход', route: '/' }
            ],

            activeIndex: 1
        };
    },

    async created() {
        const userStore = useUserStore();

        await userStore.fetchUser();

        this.userData = userStore.user;

        await this.loadLecturers();
    },

    methods: {
        async loadLecturers() {
            try {
                const token = localStorage.getItem('access_token');

                const response = await getLecturers(token);

                this.lecturers = response?.lecturers || [];
            } catch (e) {
                console.error(e);
            }
        },

        async addNewLecturer() {
            if (!this.login.trim()) return;

            try {
                this.loading = true;

                const token = localStorage.getItem('access_token');

                const response = await createLecturer(
                    token,
                    this.login.trim()
                );

                if (response?.success) {
                    this.login = '';

                    await this.loadLecturers();
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },

        async removeLecturer(lecturerId) {
            try {
                const token = localStorage.getItem('access_token');

                const response = await deleteLecturer(
                    token,
                    lecturerId
                );

                if (response?.success) {
                    this.lecturers = this.lecturers.filter(
                        lecturer => lecturer.id !== lecturerId
                    );
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>

<style scoped>
.lecturers {
    width: 100%;
}

.add_box {
    width: 100%;
    background: white;
    border-radius: 24px;
    padding: 24px;
    display: flex;
    gap: 16px;
    box-sizing: border-box;
    margin-bottom: 24px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
}

.add_box input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 24px;
    color: #1f2937;
}

.add_box input::placeholder {
    color: #b8bcc5;
}

.add_btn {
    border: none;
    background: #c8f2d2;
    color: #34c759;
    font-size: 22px;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
}

.add_btn:hover {
    opacity: 0.9;
}

.add_btn:disabled {
    opacity: 0.5;
    cursor: default;
}

.list {
    width: 100%;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
}

.item {
    min-height: 140px;
    padding: 24px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e9edf3;
    box-sizing: border-box;
}

.item:last-child {
    border-bottom: none;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.name {
    font-size: 26px;
    color: #2d3748;
    font-weight: 600;
}

.login_text {
    font-size: 18px;
    color: #64748b;
}

.mail {
    font-size: 16px;
    color: #94a3b8;
}

.delete_btn {
    border: none;
    background: #ffd9d9;
    color: #ff4d4f;
    font-size: 22px;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
}

.delete_btn:hover {
    opacity: 0.9;
}

.empty {
    padding: 48px;
    text-align: center;
    font-size: 22px;
    color: #9ca3af;
}

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
</style>