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
            <h1 class="result_title">
                Результаты теста
            </h1>

            <div class="result_card">
                <!-- Верх -->
                <div class="result_top">
                <div class="mark_block">
                    <span class="mark_label">Оценка:</span>
                    <span 
                        class="mark_value"
                        :style="markStyle"
                    >
                        {{ result.mark }}
                    </span>
                </div>

                <div class="percent">
                    {{ result.success_rate }} правильных ответов
                </div>
                </div>

                <div class="divider"></div>

                <!-- Время -->
                <div class="info_row">
                <div class="icon blue">🕒</div>
                <div class="info_text">
                    <b>Начало:</b> {{ formatDate(result.date_start) }}
                </div>
                </div>

                <div class="info_row">
                <div class="icon blue">✔</div>
                <div class="info_text">
                    <b>Конец:</b> {{ formatDate(result.date_end) }}
                </div>
                </div>

                <div class="divider"></div>

                <!-- Прогресс -->
                <div class="info_row">
                <div class="icon green">✔</div>
                <div class="info_text">
                    <b>Правильных ответов:</b>
                    {{ correctCount }} из {{ totalCount }} ({{ result.success_rate }})
                </div>
                </div>

                <div class="progress_block">
                <div class="progress_bar">
                    <div 
                    class="progress_fill"
                    :style="{ width: result.success_rate }"
                    ></div>
                </div>
                <div class="progress_percent">
                    {{ result.success_rate }}
                </div>
                </div>
            </div>
            </div>
        <AppButton class="confirm" v-if="stage != 'result'"  @click="submitTest">Завершить и отправить</AppButton>
        <AppButton class="confirm" v-if="stage === 'result'"  @click="$router.push('/home')">Закрыть</AppButton>
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
            markStyle() {
                const mark = Number(this.result?.mark);

                if (mark >= 4) {
                return {
                    color: '#16a34a',
                    background: '#dcfce7'
                };
                }

                if (mark === 3) {
                return {
                    color: '#ca8a04',
                    background: '#fef9c3'
                };
                }

                return {
                color: '#dc2626',
                background: '#fee2e2'
                };
            },
            correctCount() {
                // если нет данных — можно временно считать из %
                const percent = parseInt(this.result.success_rate);
                const total = this.totalCount;
                return Math.round((percent / 100) * total);
            },

            totalCount() {
                return 20; // 👉 пока заглушка (потом с бэка)
            },
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
    .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    }

    .result_title {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    }

    /* CARD */
    .result_card {
    width: 720px;
    padding: 32px;
    border-radius: 20px;
    background: #f8fafc;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    gap: 20px;
    }

    /* TOP */
    .result_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    .mark_block {
    display: flex;
    align-items: center;
    gap: 12px;
    }

    .mark_label {
    font-size: 24px;
    font-weight: 600;
    }

    .mark_value {
    font-size: 28px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 8px;
    }

    /* percent */
    .percent {
    font-size: 20px;
    font-weight: 600;
    color: #2563eb;
    }

    /* divider */
    .divider {
    height: 1px;
    background: #e2e8f0;
    }

    /* rows */
    .info_row {
    display: flex;
    align-items: center;
    gap: 12px;
    }

    .icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    }

    .icon.blue {
    background: #dbeafe;
    color: #2563eb;
    }

    .icon.green {
    background: #dcfce7;
    color: #16a34a;
    }

    .info_text {
    font-size: 16px;
    color: #1e293b;
    }

    /* progress */
    .progress_block {
    display: flex;
    align-items: center;
    gap: 12px;
    }

    .progress_bar {
    flex: 1;
    height: 14px;
    background: #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    }

    .progress_fill {
    height: 100%;
    background: linear-gradient(90deg, #4ade80, #22c55e);
    border-radius: 8px;
    }

    .progress_percent {
    min-width: 50px;
    text-align: right;
    font-weight: 600;
    color: #374151;
    }
</style>