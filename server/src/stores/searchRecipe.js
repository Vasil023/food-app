import { defineStore } from 'pinia'
import { findByIngridients, getRecipeById } from "@/api/findByIngridients"
import { translateText } from "@/utils/translate"

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
      this.isLoading = true
      try {
        const response = await getRecipeById(id)
        let translatedSummary = null

        if (response?.instructions) {
          translatedSummary = await translateText(response?.instructions, "en", "uk");
        } else {
          translatedSummary = await translateText(response?.summary, "en", "uk");
        }


        const translatedSteps = await Promise.all(
          response.analyzedInstructions[0].steps.map(async (step) => {
            return await translateText(step.step, "en", "uk");
          })
        );

        this.resulSearch = {
          translateText: translatedSummary,
          steps: translatedSteps,
          image: response.image,
        }

        this.isLoading = false
      } catch (error) {
        console.log('error', error);
      }
    }
  }
})
