<template>
    <section class="create_wrapper">
        <AppHeader
            :items="toogle_items"
            :activeIndex="activeIndex"
            :userName="userData?.name"
            @change="activeIndex = $event"
        />
        <div class="create">
            <AppBreadcrumbs />
            <h2>Создать тест</h2>

            <div 
                class="upload"
                @dragover.prevent
                @drop.prevent="handleDrop"
            >
                <div class="upload-inner">
                    <img src="@/assets/images/test_create.png" class="test_create" />

                    <label class="file-btn">
                        <input 
                            type="file" 
                            @change="handleFileChange"
                            hidden
                        />
                        Выберите файл
                        <span class="arrow">⌄</span>
                    </label>

                    <p>или перетащите файл сюда</p>
                </div>
            </div>

            <!-- 👇 Информация о файле -->
            <div v-if="file" class="file-info">
                <div class="file-text">
                    <strong>{{ file.name }}</strong>
                    <span>{{ formatSize(file.size) }}</span>
                </div>

                <button class="remove-btn" @click="removeFile">
                    ✕
                </button>
            </div>

            <input 
                v-model="form.name"
                class="input"
                placeholder="Название теста"
            />

            <div class="row">
                <div class="field">
                    <label>Дата начала</label>
                    <input 
                        v-model="form.startDate"
                        type="datetime-local"
                        class="input"
                    />
                </div>

                <div class="field">
                    <label>Дата окончания</label>
                    <input 
                        v-model="form.endDate"
                        type="datetime-local"
                        class="input"
                    />
                </div>
            </div>

            <button 
                class="create-btn"
                @click="handleCreate"
            >
                Создать тест
            </button>
        </div>
    </section>
    
</template>

<script>
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';

    import { useUserStore } from '@/stores/user'

    export default {
        components: { AppHeader, AppBreadcrumbs },
        data() {
            return {
                form: {
                    name: '',
                    time: '',
                    attempts: ''
                },
                file: null,

                userData: null,
                toogle_items: [
                    { label: 'Группы', route: '/lector' },
                    { label: 'Инструменты', route: '/tools' },
                    { label: 'Выход', route: '/' }
                ],
                activeIndex: 1,
            }
        },
        async created() {
            const userStore = useUserStore()

            await userStore.fetchUser()
            this.userData = userStore.user
        },
        methods: {
            handleFileChange(e) {
                const selected = e.target.files[0]
                if (selected) {
                    this.file = selected
                }
            },
            handleDrop(e) {
                const dropped = e.dataTransfer.files[0]
                if (dropped) {
                    this.file = dropped
                }
            },
            removeFile() {
                this.file = null
            },
            formatSize(size) {
                const kb = size / 1024
                if (kb < 1024) return kb.toFixed(1) + ' KB'
                return (kb / 1024).toFixed(1) + ' MB'
            },
            handleCreate() {
                const payload = {
                    ...this.form,
                    file: this.file
                }

                console.log('Создание теста:', payload)

                this.$emit('create', payload)
            }
        }
    }
</script>

<style scoped>
.create_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #f8fafc;
}

.create {
    padding: 60px 150px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #f8fafc;
    min-height: 100vh;
}

h2 {
    font-size: 36px;
    font-weight: 700;
}

/* Upload */
.upload {
    border: 2px dashed #3b82f6;
    border-radius: 12px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
}

.upload-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
}

.icon {
    font-size: 28px;
}

.test_create {
    width: 50px;
    height: 50px;
}

.file-btn {
    background: #e2e8f0;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.arrow {
    font-size: 12px;
}

/* 👇 File info */
.file-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e5e7eb;
    padding: 12px 16px;
    border-radius: 10px;
}

.file-text {
    display: flex;
    flex-direction: column;
    font-size: 14px;
}

.file-text span {
    color: #6b7280;
    font-size: 13px;
}

.remove-btn {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
}

/* Inputs */
.input {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: none;
    background: #e5e7eb;
    font-size: 16px;
}

.row {
    display: flex;
    gap: 20px;
}

/* Button */
.create-btn {
    margin-top: 10px;
    width: 200px;
    align-self: center;
    padding: 14px;
    border-radius: 10px;
    border: none;
    background: #2563eb;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.create-btn:hover {
    background: #1d4ed8;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
}

.field label {
    font-size: 14px;
    color: #6b7280;
}
</style>