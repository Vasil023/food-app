import { defineStore } from 'pinia'
import { getAllRecipe, createRecipe, updateRecipeCheckStatus } from '@/api/recipe'

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
    async toggleRecipeCheckStatus(recipeId, isChecked) {
      try {
        const response = await updateRecipeCheckStatus(recipeId, isChecked)

        if (!response) {
          this.error = 'Failed to update recipe status'
          return
        }

        this.recipes.map((recipe) => {
          if (recipe._id === recipeId) {
            recipe.isChecked = response.recipe.isChecked
          }
          return recipe
        })

        // const recipe = this.recipes.find((recipe) => recipe._id === recipeId)
        // if (recipe) recipe.isChecked = response.data.recipe.isChecked

      } catch (error) {
        this.error = error?.response?.data?.message || 'An error occurred while updating recipe status'
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
