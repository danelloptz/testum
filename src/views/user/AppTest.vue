<template>
    <div v-if="!testId" class="no_test">
        Пожалуйста, выберите тест для прохождения
    </div>
    <section class="test" v-else>
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />
        <div class="instruction">
            <h2>Инструкция</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.</p>
        </div>
        <AppQuestionCard
            v-model="answer"
            :current="1"
            :total="5"
            text="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. ∫ f(x) dx = F(b) — F(a), mattis ligula consectetur, ultrices. ∫ f(x) dx = F(b) — F(a)"
            :image="'https://img.freepik.com/free-photo/beautiful-shot-natural-scenery-autumn_181624-25934.jpg?semt=ais_hybrid&w=740&q=80'"
            :answers="[
                'Ответ 1',
                'Ответ 2',
                'Ответ $x^2$',
                'Ответ 4'
            ]"
        />
    </section>
</template>    

<script>
    import AppQuestionCard from '@/components/cards/AppQuestionCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';

    import { useUserStore } from '@/stores/user'

    export default {
        components: { AppQuestionCard, AppHeader },
        data() {
            return {
                answer: null,
                toogle_items: ['Тесты', 'Результаты', 'Выход'],
                activeIndex: 0,
            }
        },
        computed: {
            testId() {
                return this.$route.params.id
            },
            userData() {
                return useUserStore().user
            }
        }
    };
</script>

<style scoped>
    .test {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        row-gap: 48px;
    }

    .instruction {
        max-width: 856px;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0px 4px 25px 0px #0000000D;
        border: 1px solid #2563EB;
        background: #2564eb29;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    h2 {
        font-size: 18px;
        color: #1E293B;
        font-weight: 700;
    }

    p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
    }
</style>