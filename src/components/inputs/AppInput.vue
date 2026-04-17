<template>
    <div class="input_wrapper">
        <input
            class="input_el"
            :type="inputType"
            :value="modelValue"
            :placeholder="label"
            :readonly="read"
            :min="type === 'number' ? 0 : null"
            @input="onInput"
            @paste="onPaste"
            @keyup.enter="$emit('enterPress', modelValue)"
        />
    </div>
</template>

<script>

export default {
    data() { 
        return {
            showPassword: false,
        }
    },
    props: {
        modelValue: String,
        label: String,
        type: {
            type: String,
            default: "text"
        },
        read: Boolean
    },
    computed: {
        inputType() {
            if (this.type === 'password') {
                return this.showPassword ? 'text' : 'password'
            }
            return this.type
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword
        },
        onInput(e) {
            let value = e.target.value

            if (this.type === "number") {
                value = value.replace('-', '')
                value = value.replace(/[.,]/g, '')

                if (Number(value) < 0) value = 0

                e.target.value = value
            }

            this.$emit('update:modelValue', value)
        },
        onPaste(e) {
            if (this.type !== "number") return;

            e.preventDefault()
            let pasted = (e.clipboardData || window.clipboardData).getData('text')
            
            pasted = pasted.replace(/[^0-9]/g, '')

            e.target.value = pasted
            this.$emit('update:modelValue', pasted)
        }
    }
};
</script>

<style scoped>
    /* input */
    .input_el {
        width: 100%;
        height: 52px;
        padding: 17px;
        border-radius: 10px;
        border: none;
        font-size: 15px;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        color: #1E293B;
        font-family: 'SF';
        background: #E2E8F0;
        @media (max-width: 520px) {
            max-width: auto;
            height: 50px;   
            font-size: 16px;
        }
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .input_wrapper {
        position: relative;
        width: 100%;
        max-width: 450px;
    }

    .eye_wrapper {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        cursor: pointer;
        opacity: 0.7;
    }

    .eye_wrapper:hover {
        opacity: 1;
    }

    .eye {
        width: 100%;
        height: 100%;
        display: block;
    }

    /* линия */
    .eye_wrapper.closed::before {
        content: '';
        position: absolute;
        width: 120%;
        height: 1px;
        background: white;
        top: 50%;
        left: -12%;
        transform: rotate(-45deg);
        pointer-events: none;
    }
</style>
