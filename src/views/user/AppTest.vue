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
        <div class="instruction red" v-if="stage == 'extra'">
            <h2>ОШИБКА</h2>
            <p>Вы допустили ошибку при прохждении сложных вопросов. Пройдите дополнительные вопросы.</p>
        </div>
        <div class="questions" v-if="stage !== 'result'">
            <AppQuestionCard
                v-for="(q, index) in questions"
                :key="q.id"
                :current="index + 1"
                :total="questions.length"
                :text="q.text"
                :image="q.image"
                :answers="q.answers"
                :modelValue="answers[q.id]"
                :is_multiple_choice="q.is_multiple_choice"
                @update:modelValue="val => handleAnswer(q.id, val)"
            />
        </div>
        <div v-if="stage === 'result'" class="result">
            <h2>Результат теста</h2>

            <div class="result_card">
                <p><b>Оценка:</b> {{ result.mark }}</p>
                <p><b>Процент выполнения:</b> {{ result.success_rate }}</p>
                <p><b>Начало:</b> {{ formatDate(result.date_start) }}</p>
                <p><b>Конец:</b> {{ formatDate(result.date_end) }}</p>
            </div>
        </div>
        <AppButton class="confirm"  @click="submitTest">Завершить и отправить</AppButton>
    </section>
</template>    

<script>
    import AppQuestionCard from '@/components/cards/AppQuestionCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppButton from '@/components/buttons/AppButton.vue';

    import { useUserStore } from '@/stores/user'
    import { 
        getHardQu, 
        getBaseQu, 
        postHardQu, 
        postBaseQu, 
        getTestResult 
    } from '@/services/tests'

    export default {
        components: { AppQuestionCard, AppHeader, AppButton },
        data() {
            return {
                stage: 'normal', // normal | extra | result

                questions: [],
                extraQuestions: [],

                answers: {},

                toogle_items: ['Тесты', 'Результаты', 'Выход'],
                activeIndex: 0,

                result: null
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

            const token = localStorage.getItem('token')

            const data = await getHardQu(this.testId, token)

            this.questions = this.normalizeQuestions(data)
        },

        methods: {
            normalizeQuestions(data) {
                return data.map(q => ({
                    id: q.id,
                    text: q.text,
                    image: q.image_url,
                    answers: q.options.map(opt => opt.text),
                    is_multiple_choice: q.is_multiple_choice
                }))
            },
            formatDate(ts) {
                return new Date(ts).toLocaleString()
            },
            handleAnswer(questionId, value) {
                this.answers[questionId] = value
            },

            async submitTest() {
                const token = localStorage.getItem('token')

                // преобразуем ответы
                const task_answers = Object.entries(this.answers).map(([qId, value]) => ({
                    question_id: Number(qId),
                    answer_id: value
                }));

                console.log(task_answers);

                if (this.stage === 'normal') {
                    const res = await postHardQu(this.testId, task_answers, token)

                    if (res.all_correct) {
                        await this.finishTest()
                        return
                    }

                    // 👉 есть ошибки → грузим base
                    const base = await getBaseQu(this.testId, token)

                    this.stage = 'extra'
                    this.questions = this.normalizeQuestions(base)
                    this.answers = {}

                    return
                }

                if (this.stage === 'extra') {
                    await postBaseQu(this.testId, task_answers, token)

                    await this.finishTest()
                }
            },

            async finishTest() {
                const token = localStorage.getItem('token')

                const result = await getTestResult(this.testId, token)

                this.result = result
                this.stage = 'result'
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

    .red {
        background: #fee2e2; /* светло-красный */
        border: 1px solid #ef4444;
    }
</style>