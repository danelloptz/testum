import { defineStore } from 'pinia'
import { getUserInfo } from '@/services/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loaded: false
  }),

  actions: {
    async fetchUser() {
      if (this.loaded) return

      const data = await getUserInfo()
      if (data) {
        this.user = data
        this.loaded = true
      }
    }
  }
})