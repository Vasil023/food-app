import { defineStore } from 'pinia'
import { getAllRecipe, createRecipe, updateRecipe } from '@/api/recipe'
import socket from '@/socket/socket'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    // Додати новий рецепт
    async addRecipe(recipeData) {
      this.isLoading = true
      this.error = null
      const test = null
      try {
        const response = await createRecipe(recipeData)

        if (response.status === 400) {
          this.error = response?.response?.data
          return
        }

        this.recipes.unshift(response.recipe) // Оновлюємо список рецептів
      } catch (error) {
        this.error = error?.response?.data?.message || 'An error occurred while creating the recipe'
      } finally {
        this.isLoading = false
      }
    },

    // Оновити статус перевірки рецепта
    async toggleRecipeCheckStatus(recipeId, fields) {
      try {
        // Оновлюємо рецепт через сервер
        const response = await updateRecipe(recipeId, fields);

        if (!response) {
          this.error = 'Failed to update recipe status';
          return;
        }

        // Оновлюємо рецепт в масиві по ID
        const recipeIndex = this.recipes.findIndex((recipe) => recipe._id === recipeId);
        if (recipeIndex !== -1) {
          // Оновлюємо рецепт на основі відповіді від сервера
          this.recipes[recipeIndex] = response.recipe; // Заміщаємо старий рецепт на оновлений
        }

        // Перевірка, чи рецепт було знайдено та оновлено
        const updatedRecipe = this.recipes.find((recipe) => recipe._id === recipeId);
        console.log('updatedRecipe', updatedRecipe);

      } catch (error) {
        this.error = error?.response?.data?.message || 'An error occurred while updating recipe status';
      }
    },

    // Отримати всі рецепти
    async fetchAllRecipes() {
      this.isLoading = true
      this.error = null

      try {
        const response = await getAllRecipe()

        if (!response || !response.recipes) {
          this.error = 'Failed to fetch recipes'
          return
        }

        this.recipes = response.recipes || []
      } catch (error) {
        this.error = error?.response?.data?.message || 'An error occurred while fetching recipes'
      } finally {
        this.isLoading = false
      }
    },

    // Зміна статусу рецепту
    toggleRecipeStatus(id, updatedFields) {
      const recipeIndex = this.recipes.findIndex((recipe) => recipe._id === id);
      if (recipeIndex !== -1) {
        this.recipes[recipeIndex] = {
          ...this.recipes[recipeIndex],
          ...updatedFields,
        };

      } else {
        console.log('Recipe not found in Pinia state:', id);
      }
    },

    // Ініціалізація WebSocket
    initSocket() {
      socket.on('recipeUpdated', (updatedRecipe) => {
        const index = this.recipes.findIndex((r) => r._id === updatedRecipe._id);
        if (index !== -1) {
          this.recipes[index] = updatedRecipe; // Оновлюємо рецепт у списку
        }
      });

      socket.on('error', (message) => {
        console.error('WebSocket error:', message);
        this.error = message;
      });
    },

    // Відправка оновлення через WebSocket
    updateRecipeStatus(id, updatedFields) {
      socket.emit('updateRecipe', { id, ...updatedFields });
    },
  },

  getters: {
    // Отримати всі перевірені рецепти
    checkedRecipes: (state) => state.recipes.filter((recipe) => recipe.isChecked),
  },
})
