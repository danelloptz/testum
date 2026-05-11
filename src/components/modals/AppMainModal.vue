<template>
    <div class="overlay" @click.self="$emit('close')">
        <div class="modal">
            <div class="header">
                <h2>{{ title }}</h2>

                <button
                    class="close_btn"
                    @click="$emit('close')"
                >
                    ✕
                </button>
            </div>

            <p class="text">
                {{ text }}
            </p>

            <button
                class="action_btn"
                @click="$emit('close')"
            >
                Понятно
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Уведомление'
        },

        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    box-sizing: border-box;
}

.modal {
    width: 100%;
    max-width: 480px;
    background: white;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: show 0.2s ease;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

h2 {
    margin: 0;
    font-size: 30px;
    font-weight: 700;
    color: #0f172a;
}

.text {
    margin: 0;
    font-size: 18px;
    line-height: 1.6;
    white-space: pre-line;
    color: #475569;
}

.close_btn {
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 12px;
    background: #f1f5f9;
    cursor: pointer;
    font-size: 18px;
    transition: 0.2s;
}

.close_btn:hover {
    background: #e2e8f0;
}

.action_btn {
    width: 100%;
    height: 54px;
    border: none;
    border-radius: 14px;
    background: #2563eb;
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.action_btn:hover {
    background: #1d4ed8;
}

@keyframes show {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
