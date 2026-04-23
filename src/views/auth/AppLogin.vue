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
                @enterPress="openHome"
            />
            <span class="error">{{ error }}</span>
            <AppButton class="send" @click="openHome">Войти</AppButton>
        </div>
    </section>
</template>    

<script>
    import AppInputLabel from '@/components/inputs/AppInputLabel.vue';
    import AppButton from '@/components/buttons/AppButton.vue';

    import { signIn } from '@/services/auth';

    export default {
        components: { AppInputLabel, AppButton },
        data() {
            return {
                login: null, 
                password: null,
                error: null
            }
        },
        methods: {
            async openHome() {
                console.log(this.login, this.password)
                const resp = await signIn(this.login, this.password);
                if (resp.detail) {
                    this.error = resp.detail;
                    return;
                }
                this.error = null;
                if (resp) {
                    const token = resp.access_token;
                    localStorage.setItem('token', token);
                }
                this.$router.push('/home');
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
        margin-top: 30px;
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

    .error {
        margin-top: 10px;
        align-self: flex-start;
        color: #B33333;
    }
</style>