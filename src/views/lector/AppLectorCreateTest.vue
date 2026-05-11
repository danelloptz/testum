<template>
    <AppMainModal
        v-if="isModal"
        :title="title"
        :text="msg"
        @close="isModal = false"
    />
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
                :class="{ dragging: isDragging }"
                @dragover.prevent="isDragging = true"
                @dragenter.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
            >
                <div class="upload-inner">
                    <img src="@/assets/images/test_create.png" class="test_create" />

                    <label class="file-btn">
                        <input type="file" hidden @change="handleFileChange" />
                        Выберите файл
                    </label>

                    <p>или перетащите файл сюда</p>
                </div>
            </div>

            <div v-if="file" class="file-info">
                <div class="file-text">
                    <strong>{{ file.name }}</strong>
                    <span>{{ formatSize(file.size) }}</span>
                </div>

                <button class="remove-btn" @click="removeFile">✕</button>
            </div>
            <button class="create-btn" @click="handleCreate">
                Создать тест
            </button>

            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </section>
</template>

<script>
    import AppHeader from '@/components/headers/AppHeader.vue';
    import AppBreadcrumbs from '@/components/navigation/AppBreadcrumbs.vue';
    import AppMainModal from '@/components/modals/AppMainModal.vue';

    import { useUserStore } from '@/stores/user'
    import { uploadTestFile } from '@/services/tests'

    export default {
        components: { AppHeader, AppBreadcrumbs, AppMainModal },

        data() {
            return {
                file: null,
                error: null,

                form: {
                    name: '',
                    startDate: '',
                    endDate: ''
                },

                userData: null,

                toogle_items: [
                    { label: 'Группы', route: '/lector' },
                    { label: 'Инструменты', route: '/lector/tools' },
                    { label: 'Выход', route: '/' }
                ],

                activeIndex: 1,

                title: null,
                msg: null,
                isModal: false,
                isDragging: false
            }
        },

        async created() {
            const userStore = useUserStore()
            await userStore.fetchUser()
            this.userData = userStore.user
        },

        methods: {
            handleFileChange(e) {
                this.file = e.target.files[0] || null
            },

            handleDrop(e) {
                this.isDragging = false
                this.file = e.dataTransfer.files[0] || null
            },

            removeFile() {
                this.file = null
            },

            formatSize(size) {
                const kb = size / 1024
                if (kb < 1024) return kb.toFixed(1) + ' KB'
                return (kb / 1024).toFixed(1) + ' MB'
            },

            async handleCreate() {
                this.error = null

                if (!this.file) {
                    this.title = 'Ошибка!';
                    this.msg = 'Нужно выбрать файл.';
                    this.isModal = true;
                    return
                }

                const token = localStorage.getItem('access_token')

                const res = await uploadTestFile(
                    token,
                    this.file,
                    false // ignore_validation
                )

                if (!res || !res.success) {
                    this.title = 'Ошибка загрузки теста';

                    const errors = [
                        ...(res?.format_errors || []).map(e => e.error),
                        ...(res?.validation_errors || []).map(e => e.error)
                    ];

                    this.msg = errors.length
                        ? errors.join('\n')
                        : 'Не удалось загрузить тест';

                    this.isModal = true;

                    return;
                }

                this.$router.push('/lector')
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
}

h2 {
    font-size: 36px;
    font-weight: 700;
}

.upload-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
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
}

.file-info {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background: #e5e7eb;
    border-radius: 10px;
}

.file-text {
    display: flex;
    column-gap: 10px;
    align-items: center;
}

.input {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    background: #e5e7eb;
    border: none;
}

.row {
    display: flex;
    gap: 20px;
}

.create-btn {
    width: 200px;
    margin: 0 auto;
    padding: 14px;
    border-radius: 10px;
    background: #2563eb;
    color: white;
    font-weight: 600;
    border: none;
}

.error {
    color: red;
}

.upload {
    border: 2px dashed #3b82f6;
    border-radius: 12px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    transition: 0.2s;
}

.upload.dragging {
    background: #dbeafe;
    border-color: #2563eb;
    transform: scale(1.01);
}
</style>