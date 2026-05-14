<template>
    <div v-if="!testId" class="no_test">
        Пожалуйста, выберите тест для прохождения
    </div>

    <section class="test" ref="test_container" v-else>
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />

        <div class="instruction">
            <h2>Инструкция</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit...</p>
        </div>

        <div class="instruction red" v-if="stage === 'extra'">
            <h2>ОШИБКА</h2>
            <p>Вы допустили ошибку. Пройдите дополнительные вопросы.</p>
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

        <AppResultCard
            v-if="stage === 'result'"
            :result="result"
            @close="$router.push('/home')"
        />

        <AppButton
            class="confirm"
            v-if="stage !== 'result'"
            @click="submitTest"
        >
            Завершить и отправить
        </AppButton>
    </section>
</template>

<script>
    import AppQuestionCard from '@/components/cards/AppQuestionCard.vue';
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppResultCard from '@/components/cards/AppResultCard.vue';

    import { nextTick } from 'vue';
    import { useUserStore } from '@/stores/user';

    import {
        getBaseTasks,
        getHardTasks,
        submitBaseAnswers,
        submitHardAnswers,
        getStudentTestResult
    } from '@/services/tests';

    export default {
        components: { AppQuestionCard, AppHeader, AppButton, AppResultCard },

        data() {
            return {
                stage: 'normal', // normal | extra | result

                questions: [],
                answers: {},

                result: null,

                toogle_items: [
                    { label: 'Тесты', route: '/home' },
                    { label: 'Результаты', route: '/results' },
                    { label: 'Выход', route: '/' }
                ],

                activeIndex: 0
            };
        },

        computed: {
            testId() {
                return this.$route.params.id;
            },

            userData() {
                return useUserStore().user;
            }
        },

        async created() {
            if (!this.testId) return;

            const token = localStorage.getItem('access_token');

            const data = await getHardTasks(token, this.testId);

            this.questions = this.normalizeQuestions(data.tasks);
        },

        methods: {
            normalizeQuestions(tasks) {
                return tasks.map((q, index) => ({
                    id: q.id,

                    text: q.text,

                    image: q.image_url || null,

                    answers: q.answers.map(a => ({
                        text: a.text,
                        image: a.image_url || null,
                        id: a.id
                    })),

                    is_multiple_choice: q.is_multiple_choice
                }));
            },

            handleAnswer(questionId, value) {
                this.answers[questionId] = value;
            },

            async submitTest() {
                const token = localStorage.getItem('access_token');

                const payload = {
                    answers: Object.entries(this.answers).map(([task_id, options]) => ({
                        task_id: Number(task_id),
                        options: Array.isArray(options) ? options : [options]
                    }))
                };

                // 🔹 1 этап — hard
                if (this.stage === 'normal') {
                    const res = await submitHardAnswers(token, this.testId, payload.answers);

                    if (res?.is_all_correct) {
                        await this.finishTest();
                        return;
                    }

                    // 🔥 ошибка → грузим base
                    const base = await getBaseTasks(token, this.testId);

                    this.stage = 'extra';
                    this.questions = this.normalizeQuestions(base.tasks);
                    this.answers = {};

                    await nextTick();

                    this.$refs.test_container?.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    return;
                }

                // 🔹 2 этап — base
                if (this.stage === 'extra') {
                    await submitBaseAnswers(token, this.testId, payload.answers);

                    await this.finishTest();
                }
            },

            async finishTest() {
                const token = localStorage.getItem('access_token');

                const result = await getStudentTestResult(token, this.testId);

                this.result = result;
                this.stage = 'result';
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
        background: #fee2e2;
        border: 1px solid #ef4444;
    }
</style>