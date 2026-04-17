<template>
    <section class="main">
        <header class="header">
            <div class="header_row">
                <img src="@/assets/images/logo.png" class="logo" />
                <span class="header_text">Testum</span>
            </div>
            <div class="header_toogle">
                <span 
                    class="header_toogle_items"
                    v-for="(item, index) in toogle_items"
                    :key="index"
                    :class="{
                        active: index == activeIndex
                    }"
                    @click="activeIndex = index"
                >
                    {{ item }}
                </span>
            </div>
            <span class="header_text">{{ userData.name }}</span>
        </header>

        <main class="tests">
            <h2>Список тестов</h2>
            <div 
                class="cards"
            >
                <AppTestCard 
                    v-for="(item, index) in tests"
                    :key="index"
                    :test="item"
                />
            </div>
        </main>
    </section>
</template>    

<script>
    import { getUserInfo } from '@/services/user';
    import { getStudentTests } from '@/services/tests';

    import AppTestCard from '@/components/cards/AppTestCard.vue';

    export default {
        components: { AppTestCard },
        data() {
            return {
                userData: null,
                token: 'mfkmrgk',
                toogle_items: ['Тесты', 'Результаты', 'Выход'],
                activeIndex: 0,
                tests: null
            }
        },
        async created() {
            const response = await getUserInfo(this.token);
            if (response) {
                this.userData = response;
            }

            const tests_response = await getStudentTests(this.token);
            if (tests_response) {
                this.tests = tests_response;
            }
        },
    };
</script>

<style scoped>
    .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #f8fafc;
    }

    .header {
        width: 100%;
        padding: 10px 121px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E2E8F0;
    }

    .header_text {
        font-size: 16px;
        font-weight: 700;
        color: #1E293B;
        text-transform: uppercase;
    }

    .header_toogle {
        display: flex;
        align-items: center;
        column-gap: 120px;
    }

    .header_toogle_items {
        font-size: 16px;
        color: #64748B;
        text-transform: uppercase;
        transition: .2s ease-in;
        font-weight: 500;
        position: relative;
        cursor: pointer;
    }

    .active {
        color: #2563EB;
    }

    .header_toogle_items.active::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px; /* отступ от текста */
        width: 100%;
        height: 2px; /* толщина линии */
        background-color: #2563EB;
        border-radius: 2px;
    }

    .header_row {
        display: flex;
        align-items: center;
        column-gap: 10px;
    }

    .logo {
        width: 80px;
        height: 80px;
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