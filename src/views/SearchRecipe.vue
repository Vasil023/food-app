<script setup>
import { ref } from "vue";
import { useSearchRecipeStore } from "@/stores/searchRecipe";
import recipeItem from "@/components/recipeItem.vue";

const searchRecipeStore = useSearchRecipeStore();

const ingredient = ref("");

const sendIngredient = () => {
  searchRecipeStore.searchRecipe(ingredient.value);
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="sendIngredient">
      <input
        class="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
        type="text"
        placeholder="Хліб, яйце"
        v-model="ingredient"
      />
      <button @click="translateIngredient" class="button">Пошук</button>
    </form>

    <div v-if="searchRecipeStore.allRecipe" class="mt-7">
      <h2>Знайдені рецепти:</h2>
      <ul class="columns-2 lg:columns-4 lg:gap-3 gap-2 pt-3 pb-20">
        <li v-for="recipe in searchRecipeStore.allRecipe" :key="recipe.id">
          <recipeItem :item="recipe" />
        </li>
      </ul>
    </div>
    <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
  </div>
</template>
