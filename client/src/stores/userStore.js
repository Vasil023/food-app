import { defineStore } from 'pinia';
import { login, register, updatePoint, getUser } from '@/api/user';
import { useRecipeStore } from '@/stores/recipeStore';
import socket from '@/socket/socket';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    points: null,
    nickname: null,
    email: null,
    error: null,
    isLoading: false,
    socket,
  }),

  actions: {
    setLoading(state) {
      this.isLoading = state;
    },

    setError(error) {
      this.error = error;
    },

    handleApiErrors(response) {
      if (response.status === 400) {
        this.error = response.response?.data.errors.reduce((acc, item) => {
          acc[item.path] = item.msg;
          return acc;
        }, {});
        return true; // Помилка є
      }
      return false; // Помилки немає
    },

    saveUserData({ token, userId, point, email, nickname }) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      this.token = token;
      this.userId = userId;
      this.points = point;
      this.email = email;
      this.nickname = nickname;
    },

    async register(email, nickname, password, role) {
      this.setLoading(true);
      this.setError(null);

      try {
        const response = await register(email, nickname, password, role);

        if (this.handleApiErrors(response)) {
          this.setLoading(false);
          return;
        }

        this.setLoading(false);
      } catch (error) {
        console.error('Error during registration:', error);
        this.setError('Не вдалося зареєструватися');
        this.setLoading(false);
      }
    },

    async login(email, password) {
      this.setLoading(true);
      this.setError(null);

      try {
        const response = await login(email, password);

        if (this.handleApiErrors(response)) {
          this.setLoading(false);
          return;
        }

        this.saveUserData(response);

        this.setLoading(false);
        useRecipeStore().fetchAllRecipes();
      } catch (error) {
        console.error('Помилка під час авторизації:', error);
        this.setError('Виникла помилка з’єднання. Спробуйте ще раз.');
        this.setLoading(false);
      }
    },

    async getUser() {
      try {
        const response = await getUser(this.userId);

        if (response.status === 401) {
          this.logout();
          return;
        }

        this.points = response?.point;
        this.email = response?.email;
        this.nickname = response?.nickname;
      } catch (error) {
        console.error('Помилка при отриманні даних користувача:', error);
      }
    },

    async fetchUpdatedPoints(id, point, userId) {
      try {
        const response = await updatePoint(point, userId);

        useRecipeStore().toggleRecipeCheckStatus(id, false);

        this.points = response?.user?.point;
        localStorage.setItem('point', this.points);
      } catch (error) {
        console.error('Помилка при оновленні балів:', error);
      }
    },

    initSocket() {
      socket.on('userUpdated', (updatedUser) => {
        if (updatedUser._id === this.userId) {
          this.points = updatedUser.point;
        }
      });
    },

    updateUser(userId, point) {
      socket.emit('updateUser', { userId, point });
    },

    isLoggedIn() {
      return !!this.token;
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('point');

      this.token = null;
      this.userId = null;
      this.points = null;
    },
  },
});
