<template>
    <section class="card">
            <h3>{{ test.name }}</h3>
            
            <span class="sm_mute">
                {{ test.cnt_hard_questionsт}} основных • {{ test.cnt_questions - test.cnt_hard_questions }} дополнительных
            </span>

            <span class="sm_mute m16 w_normal">
                {{ formatDate(test.date_start) }} — {{ formatDate(test.date_end) }}
            </span>

            <AppButton 
                class="card_btn"
                :class="{
                    btn_in: test.status == 'В процессе',
                    btn_close: test.status == 'Не доступен',
                }"
                @click="$emit('open')"
            >
                {{ 'Просмотр' }}
            </AppButton>
    </section>
</template>

<script>
    import AppButton from '@/components/buttons/AppButton.vue';

    export default {
        props: {
            test: Object
        },
        components: { AppButton },
        methods: {
            formatDate(date) {
                const d = new Date(date)

                const day = String(d.getDate()).padStart(2,'0')
                const month = String(d.getMonth()+1).padStart(2,'0')
                const year = d.getFullYear()

                return `${day}.${month}.${year}`
            },
        }
    };
</script>

<style scoped>
    .card {
        padding: 24px 32px;
        background: white;
        box-shadow: 0px 4px 25px 0px #0000000D;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        max-width: 350px;
    }

    .status {
        font-size: 12px;
        text-transform: uppercase;
        padding: 4px;
        font-weight: 700;
        border-radius: 4px;
        width: fit-content;
    }

    .green {
        color: #34C759;
        background-color: #34C75940;
    }

    .yellow {
        color: #F59E0B;
        background: #FFAD3F40;
    }

    .red {
        color: #FF4B59;
        background: #FF4B5940;
    }

    h3 {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.3;
        color: #1E293B;
        margin-top: 16px;
    }

    .sm_mute {
        color: #64748B;
        font-size: 14px;
        font-weight: 500;
        margin-top: 12px;
    }

    .m16 {
        margin-top: 16px;
    }

    .w_normal {
        font-weight: normal;
    }

    .card_btn {
        width: 141px;
        height: 52px;
        margin-top: 32px;
        font-size: 16px;
        background: none;
        border: 1px solid #1E293B;
        color: #1E293B;
        border-radius: 8px;
    }

    .card_btn:hover {
        background: #1E293B;
        color: white;
    }

    .btn_in {
        background: none !important;
        border: 1px solid #2563EB;
        color: #2563EB;
        font-size: 16px;
    }

    .btn_close {
        background: none !important;
        border: 1px solid #1E293B;
        color: #1E293B;
        font-size: 16px;
    }
</style>