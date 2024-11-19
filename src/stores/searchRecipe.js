import { defineStore } from 'pinia'
import { findByIngridients } from "@/api/findByIngridients"

export const useSearchRecipeStore = defineStore('search', {
  state: () => ({
    allRecipe: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async searchRecipe(ingredient) {
      this.isLoading = true
      try {
        const response = await findByIngridients(ingredient)

        this.allRecipe = response

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.error = error.response?.data?.message || 'Не вдалося створити рецепт'
      }
    },





  }
})
