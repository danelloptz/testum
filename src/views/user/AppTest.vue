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
        <div class="questions">
            <AppQuestionCard
                v-for="(q, index) in questions"
                :key="q.id"
                :current="index + 1"
                :total="questions.length"
                :text="q.text"
                :image="q.image"
                :answers="q.answers"
                :modelValue="answers[q.id]"
                @update:modelValue="val => handleAnswer(q.id, val)"
            />
        </div>
        <AppButton class="confirm">Завершить и отправить</AppButton>
    </section>
</template>    

<script>
    import AppQuestionCard from '@/components/cards/AppQuestionCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppButton from '@/components/buttons/AppButton.vue';

    import { useUserStore } from '@/stores/user'

    export default {
        components: { AppQuestionCard, AppHeader, AppButton },
        data() {
            return {
                answer: null,
                toogle_items: ['Тесты', 'Результаты', 'Выход'],
                activeIndex: 0,
                questions: [],
                answers: {}
            }
        },
        computed: {
            testId() {
                return this.$route.params.id
            },
            userData() {
                return useUserStore().user
            }
        },
        async created() {
            if (!this.testId) return

            // 🔥 заглушка
            this.questions = [
            {
                id: 1,
                text: 'Интеграл: $\\int f(x) dx$',
                image: 'https://img.freepik.com/free-photo/beautiful-shot-natural-scenery-autumn_181624-25934.jpg?semt=ais_hybrid&w=740&q=80',
                answers: ['1', '2', '$x^2$', '4']
            },
            {
                id: 2,
                text: '2 + 2 = ?',
                image: null,
                answers: ['3', '4', '5']
            }
            ]
        },

        methods: {
            handleAnswer(questionId, value) {
            this.answers[questionId] = value
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

    .questions {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .confirm {
        width: 228px;
        height: 52px;
        margin-top: 20px;
        font-size: 16px;
        border-radius: 8px;
        margin-bottom: 60px;
    }
</style>