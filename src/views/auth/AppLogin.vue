<template>
    <section class="login">
        <div class="login_view">
            <img src="@/assets/images/logo.png" class="logo" />
            <h1>Testum</h1>
            <AppInputLabel
                v-model="login"
                label="Логин"
                placeholder="Введите логин"
                type="text"
                class="input m40"
            />
            <AppInputLabel
                v-model="password"
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                class="input m20"
            />
            <AppButton class="send">Войти</AppButton>
        </div>
    </section>
</template>    

<script>
    import AppInputLabel from '@/components/inputs/AppInputLabel.vue';
    import AppButton from '@/components/buttons/AppButton.vue';

    export default {
        components: { AppInputLabel, AppButton },
        data() {
            return {
                login: null, 
                password: null
            }
        }
    };
</script>

<style scoped>
    .login {
        background: #f8fafc;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-family: 'SF';
        color: black;
        font-size: 24px;
        font-weight: 700;
        margin-top: 32px;
    }

    .login_view {
        padding: 48px;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 526px;
        box-shadow: 0px 4px 25px 0px #0000000D;
        border-radius: 16px;
    }

    .logo {
        width: 100px;
        height: 100px;
    }

    .input {
        width: 100%;
    }

    .m40 {
        margin-top: 40px;
    }

    .m20 {
        margin-top: 20px;
    }

    .send {
        width: 100%;
        height: 52px;
        font-size: 16px;
        margin-top: 32px;
    }
</style>