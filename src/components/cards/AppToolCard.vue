<template>
    <div 
        class="card"
        :class="{ filled: filled }"
        @click="$emit('open')"
    >
        <div class="icon">
            <slot name="icon">
                <img v-if="icon" :src="icon" alt="icon" />
            </slot>
        </div>

        <span class="text">
            {{ text }}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                default: ''
            },
            filled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .card {
        width: 100%;
        height: 120px;
        border-radius: 20px;
        border: 2px solid #3b82f6;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 0 32px;
        cursor: pointer;
        background: white;
        transition: 0.2s;
    }

    .card:hover {
        transform: translateY(-2px);
    }

    .card.filled {
        background: #2f5fd7;
        border: none;
        color: white;
    }

    .icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
    }

    .card:not(.filled) .icon {
        background: #EFF6FF;
    }

    .text {
        font-size: 22px;
        font-weight: 600;
    }

    .icon img {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }
</style>