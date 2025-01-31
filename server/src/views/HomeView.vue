<script setup>
import { useRecipeStore } from "@/stores/recipeStore";
import { useUserStore } from "@/stores/userStore";

import RecipeItem from "@/components/RecipeItem.vue";
import SpinerIcon from "@/components/Spiner-icon.vue";

const recipeStore = useRecipeStore();
const userStore = useUserStore();

const checkRecipe = async (id, isChecked) => {
  recipeStore.updateRecipeStatus(id, { user: { _id: userStore.userId }, isChecked: isChecked });
};
</script>

<template>
  <div class="container">
    <div
      class="columns-2 md:columns-3 lg:columns-6 lg:gap-3 gap-2 pt-1 pb-20"
      v-if="recipeStore.recipes.length && !recipeStore.isLoading"
    >
      <RecipeItem v-for="item in recipeStore.recipes" :item="item" :key="item._id">
        <template v-slot:checkRecipe>
          <button
            class="overlay"
            :class="item.isChecked ? 'pi pi-bookmark-fill' : 'pi pi pi-bookmark'"
            @click="checkRecipe(item._id, item.isChecked ? false : true)"
            style="font-size: 1rem"
          ></button>
        </template>
      </RecipeItem>
    </div>

    <div
      class="grid place-items-center h-[calc(100vh-180px)]"
      v-if="recipeStore.recipes.length === 0 && !recipeStore.isLoading"
    >
      <div class="grid place-items-center gap-4">
        <span class="pi pi-cart-minus" style="font-size: 4rem; color: #5a382d"></span>
        <p>Нічого не знайдено</p>
      </div>
    </div>

    <SpinerIcon v-if="recipeStore.isLoading" />
  </div>
</template>
