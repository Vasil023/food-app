import { defineStore } from 'pinia'
import { login, register, updatePoint, getUser } from '@/api/user'
import { useRecipeStore } from '@/stores/recipeStore'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    points: localStorage.getItem('point') || null,
    email: null,
    error: null,
    isLoading: false
  }),

  actions: {
    async register(email, password, role) {
      this.isLoading = true
      try {
        const response = await register(email, password, role)

        // Перевірка помилок  
        if (response.status === 400) {
          this.error = response.response?.data;
          this.isLoading = false;
          return
        }

        this.isLoading = false

      } catch (error) {
        console.log('error', error);
        this.error = error || 'Не вдалося зареєструватися'
      }
    },

    async login(email, password) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await login(email, password);
        console.log('response', response);
        // Перевірка помилок  
        if (response.status === 400) {
          this.error = response.response?.data;
          this.isLoading = false;
          return
        }

        localStorage.setItem('token', response?.token);
        localStorage.setItem('userId', response?.userId);
        localStorage.setItem('point', response?.point);

        this.token = response?.token;
        this.userId = response?.userId;
        this.points = response?.point;
        this.email = response?.email

        this.isLoading = false;

        useRecipeStore().fetchAllRecipes()
      } catch (error) {
        console.error('Помилка:', error);
        this.error = 'Виникла помилка з’єднання. Спробуйте ще раз.';
        this.isLoading = false;
      }
    },

    async getUser() {
      try {
        const response = await getUser(this.userId)
        this.points = response?.point
        this.email = response?.email
      } catch (error) {
        console.log('error', error);
      }
    },

    async fetchUpdatedPoints(id, point, userId) {
      try {
        const response = await updatePoint(point, userId)

        useRecipeStore().toggleRecipeCheckStatus(id, false)

        // this.points = response?.user?.point

        localStorage.setItem('point', response?.user?.point);

      } catch (error) {
        console.log('error', error);
      }
    },

    isLoggedIn() {
      return !!this.token
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('point')
      this.token = null
      this.userId = null
      this.points = null
    }
  },
})
