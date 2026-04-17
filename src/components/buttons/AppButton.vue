<template>
    <button class="btn" type="button" :disabled="clicked" @click="handleClick">
        <template v-if="clicked">
            ✓
        </template>
        <template v-else>
            <slot />
        </template>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "button",
        },
    },

    data() {
        return {
            clicked: false
        }
    },

    methods: {
        handleClick(event) {
            // this.$emit('click', event) // чтобы родитель тоже получил клик

            this.clicked = true

            setTimeout(() => {
                this.clicked = false
            }, 3000)
        }
    }
};
</script>

<style scoped>
.btn {
    width: 100%;
    height: 60px;
    border-radius: 16px;
    border: none;
    background: #0059FF;
    color: white;
    font-weight: 600;
    cursor: pointer;
    font-family: 'SF';
    font-size: 18px;
    transition: .2s ease-in;

    display: flex;
    align-items: center;
    justify-content: center;
}

.btn:hover {
    background: #1667ff;
}
</style>