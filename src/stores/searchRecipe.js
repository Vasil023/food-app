import { defineStore } from 'pinia'
import { findByIngridients, getRecipeById } from "@/api/findByIngridients"

export const useSearchRecipeStore = defineStore('search', {
  state: () => ({
    allRecipe: [],
    resulSearch: null,
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

    async fethRecipeById(id) {
      try {
        const response = await getRecipeById(id)
        console.log('response', response);
        this.resulSearch = response
      } catch (error) {
        console.log('error', error);
      }
    }
  }
})
