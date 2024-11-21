import { defineStore } from 'pinia'
import { getAllRecipe, createRecipe, updateRecipe } from '@/api/recipe'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [], // Перейменовано для більшої ясності
    isLoading: false,
    error: null,
  }),

  actions: {
    // Додати новий рецепт
    async addRecipe(recipeData) {
      this.isLoading = true
      this.error = null

      try {
        const response = await createRecipe(recipeData)

        if (!response) {
          this.error = response?.data?.message || 'Failed to create recipe'
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
        console.log('fields', fields);

        // Оновлюємо рецепт через сервер
        const response = await updateRecipe(recipeId, fields);

        console.log('response', response);

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
  },

  getters: {
    // Отримати всі перевірені рецепти
    checkedRecipes: (state) => state.recipes.filter((recipe) => recipe.isChecked),
  },
})
