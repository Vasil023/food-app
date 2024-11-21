<script setup>
import { ref, watch, onMounted } from "vue";
import { useSearchRecipeStore } from "@/stores/searchRecipe";
import { useRoute, useRouter } from "vue-router";
import recipeItem from "@/components/recipeItem.vue";

const searchRecipeStore = useSearchRecipeStore();

const route = useRoute();
const router = useRouter();

const ingredient = ref("");

// Sync input with the URL query on mount
onMounted(() => {
  const queryIngredient = route.query.ingredient || "";
  ingredient.value = queryIngredient; // Синхронізуємо поле вводу з URL
  if (queryIngredient) {
    searchRecipeStore.searchRecipe(queryIngredient);
  }
});

// Стежимо за змінами `ingredient`, уникаючи рекурсії
watch(ingredient, (newValue) => {
  if (newValue !== route.query.ingredient) {
    // Оновлюємо маршрут тільки якщо значення змінилося
    router
      .push({
        query: {
          ...route.query,
          ingredient: newValue || undefined,
        },
      })
      .catch((err) => {
        // Ігноруємо помилки переходу (наприклад, якщо маршрут той самий)
        if (err.name !== "NavigationDuplicated") {
          console.error(err);
        }
      });
  }
});

// Submit handler for search
const sendIngredient = () => {
  searchRecipeStore.searchRecipe(ingredient.value);
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="sendIngredient">
      <input
        class="w-full mt-3 px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
        type="text"
        placeholder="Хліб, яйце"
        v-model="ingredient"
      />
      <button class="button">Пошук</button>
    </form>

    <div v-if="searchRecipeStore.allRecipe.length && !searchRecipeStore.isLoading" class="mt-7">
      <h2>Знайдені рецепти:</h2>
      <ul class="columns-2 lg:columns-4 lg:gap-3 gap-2 pt-3 pb-20">
        <li v-for="recipe in searchRecipeStore.allRecipe" :key="recipe.id">
          <recipeItem :item="recipe" />
        </li>
      </ul>
    </div>

    <div v-if="searchRecipeStore.isLoading">
      <div class="grid place-items-center h-[calc(100vh-180px)]">
        <div class="grid place-items-center gap-4">
          <span class="pi pi-spin pi-spinner" style="font-size: 3rem; color: #5a382d"></span>
        </div>
      </div>
    </div>
  </div>
</template>
