<template>
    <section class="group_card">
        <div class="group_card_row">
            <h2>{{ name }}</h2>
            <div class="sm_row">
                <img src="@/assets/images/user.png" class="icon" />
                <span class="sm_row_text">{{ count }} студентов</span>
            </div>
        </div>
        <AppButton class="button" @click="$emit('open')">Тесты</AppButton>
    </section>
</template>

<script>
    import AppButton from '@/components/buttons/AppButton.vue';

    export default {
        components: { AppButton },
        props: {
            name: String,
            count: Number
        }
    };
</script>

<style scoped>
    .group_card {
        box-shadow: 0px 4px 25px 0px #0000000D;
        background: white;
        padding: 32px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        min-width: 352px;
    }

    .group_card_row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h2 {
        font-size: 28px;
        font-weight: 700;
        color: #1E293B;
        font-family: 'SF';
    }

    .sm_row {
        display: flex;
        align-items: center;
        column-gap: 3px;
    }

    .icon {
        width: 17px;
        height: 17px;
    }

    .sm_row_text {
        font-size: 14px;
        color: #64748B;
        font-family: 'SF';
    }

    .button {
        width: 100%;
        height: 38px;
        font-size: 16px;
        background: none;
        border: 1px solid #2563EB;
        color: #2563EB;
        border-radius: 8px;
        margin-top: 32px;
    }
</style>