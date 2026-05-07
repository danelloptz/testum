import { defineStore } from 'pinia'
import { getMe } from '@/services/auth'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),

    actions: {
        async fetchUser() {
            const token = localStorage.getItem('access_token')

            if (!token) {
                this.user = null
                return null
            }

            try {
                const user = await getMe(token)

                this.user = user

                return user
            } catch (e) {
                this.user = null
                return null
            }
        },

        logout() {
            this.user = null

            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }
})