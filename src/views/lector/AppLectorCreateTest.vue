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
            <div class="images_block">
                <h3>Загрузка изображений</h3>

                <label class="image-upload-btn">
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        @change="handleImageUpload"
                    />
                    Загрузить изображение
                </label>

                <div
                    v-if="uploadedImages.length"
                    class="images_list"
                >
                    <div
                        v-for="(img, index) in uploadedImages"
                        :key="index"
                        class="image_item"
                    >
                        <img
                            :src="img.preview"
                            class="preview"
                        />

                        <div class="image_info">
                            <input
                                :value="img.url"
                                readonly
                                class="link_input"
                            />

                            <button
                                class="copy_btn"
                                @click="copyLink(img.url)"
                            >
                                Копировать
                            </button>
                        </div>
                    </div>
                </div>
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
    import { uploadTestFile, uploadPicture } from '@/services/tests'

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
                isDragging: false,

                uploadedImages: []
            }
        },

        async created() {
            const userStore = useUserStore()
            await userStore.fetchUser()
            this.userData = userStore.user
        },

        methods: {
            async handleImageUpload(e) {
                const files = Array.from(e.target.files || []);

                if (!files.length) return;

                const token = localStorage.getItem('access_token');

                for (const file of files) {
                    const res = await uploadPicture(token, file);

                    if (res?.Success) {
                        this.uploadedImages.push({
                            name: file.name,
                            url: res.URL,
                            preview: URL.createObjectURL(file)
                        });
                    }
                }

                // чтобы можно было загрузить тот же файл повторно
                e.target.value = '';
            },

            async copyLink(link) {
                await navigator.clipboard.writeText(link)

                this.title = 'Ссылка скопирована'
                this.msg = link
                this.isModal = true
            },
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

.images_block {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.images_block h3 {
    font-size: 24px;
    font-weight: 700;
}

.image-upload-btn {
    width: fit-content;
    background: #dbeafe;
    color: #2563eb;
    padding: 12px 18px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
}

.image-upload-btn:hover {
    opacity: 0.9;
}

.images_list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.image_item {
    background: white;
    border-radius: 14px;
    padding: 16px;
    box-shadow: 0 4px 25px 0 #0000000d;
    display: flex;
    gap: 16px;
    align-items: center;
}

.preview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
    flex-shrink: 0;
}

.image_info {
    width: 100%;
    display: flex;
    gap: 12px;
}

.link_input {
    flex: 1;
    border: none;
    background: #f1f5f9;
    border-radius: 10px;
    padding: 12px;
    font-size: 14px;
}

.copy_btn {
    border: none;
    background: #2563eb;
    color: white;
    border-radius: 10px;
    padding: 0 18px;
    cursor: pointer;
    font-weight: 600;
}
</style>