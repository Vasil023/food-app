<script setup>
import { ref, watch, onMounted } from "vue";
import { useSearchRecipeStore } from "@/stores/searchRecipe";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

import { translateText } from "@/utils/translate";
import { useRecipeStore } from "@/stores/recipeStore";
import { useUserStore } from "@/stores/userStore";

import RecipeItem from "@/components/RecipeItem.vue";
import SpinerIcon from "@/components/Spiner-icon.vue";

const searchRecipeStore = useSearchRecipeStore();
const recipeStore = useRecipeStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const ingredient = ref("");

const addedRecipe = async (id, title, image) => {
  const translated = await translateText(title, "en", "uk");

  await recipeStore
    .addRecipe({ id, title: translated, image, user: userStore.userId })
    .then(() => {
      toast.success("Рецепт успішно додано");
    })
    .catch(() => {
      toast.error("Не вдалося додати рецепт");
    });
};

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
    <div class="max-w-[550px] mx-auto">
      <h1 class="font-extrabold text-center">Пошук рецептів за інгредієнтами</h1>
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
        <ul class="columns-2 lg:gap-3 gap-2 pt-3 pb-20">
          <li v-for="recipe in searchRecipeStore.allRecipe" :key="recipe.id">
            <RecipeItem :item="recipe">
              <template v-slot:addedRecipe>
                <button
                  class="pi pi-plus overlay"
                  @click="addedRecipe(recipe.id, recipe.title, recipe.image)"
                  style="font-size: 1rem"
                ></button>
              </template>
            </RecipeItem>
          </li>
        </ul>
      </div>

      <SpinerIcon v-if="searchRecipeStore.isLoading" />
    </div>
  </div>
</template>
